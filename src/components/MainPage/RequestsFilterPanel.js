import React, { useEffect, useState } from "react";

const RequestsFilterPanel = ({
  onApplyFilters,
  onResetFilters,
  currentFilter,
  activeFilters = {},
}) => {
  const [draft, setDraft] = useState(activeFilters);
  const parcel = currentFilter === "parcel";
  const fromKey = parcel ? "pickupAddress" : "departureAddress";
  const toKey = parcel ? "deliveryAddress" : "destinationAddress";
  useEffect(() => {
    setDraft(activeFilters);
  }, [activeFilters, currentFilter]);
  const change = (event) =>
    setDraft((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  const apply = (event) => {
    event.preventDefault();
    const next = {};
    Object.entries(draft).forEach(([key, value]) => {
      const trimmed = String(value ?? "").trim();
      if (trimmed) next[key] = trimmed;
    });
    if (!next.sortBy) delete next.sortDirection;
    onApplyFilters(next);
  };
  return (
    <form
      className="murza-list-filters"
      onSubmit={apply}
      aria-label="Filter routes"
    >
      <label>
        From
        <input
          name={fromKey}
          value={draft[fromKey] || ""}
          onChange={change}
          placeholder="Departure city"
          maxLength={250}
        />
      </label>
      <label>
        To
        <input
          name={toKey}
          value={draft[toKey] || ""}
          onChange={change}
          placeholder="Destination city"
          maxLength={250}
        />
      </label>
      <div className="murza-filter-fields">
        <label>
          Earliest date
          <input
            type="date"
            name="dateFrom"
            value={draft.dateFrom || ""}
            max={draft.dateTo || undefined}
            onChange={change}
          />
        </label>
        <label>
          Latest date
          <input
            type="date"
            name="dateTo"
            value={draft.dateTo || ""}
            min={draft.dateFrom || undefined}
            onChange={change}
          />
        </label>
      </div>
      {parcel && (
        <div className="murza-filter-fields">
          <label>
            Min. price (€)
            <input
              type="number"
              name="priceMin"
              min="0"
              max={draft.priceMax || undefined}
              step="0.01"
              value={draft.priceMin || ""}
              onChange={change}
              placeholder="Any"
            />
          </label>
          <label>
            Max. price (€)
            <input
              type="number"
              name="priceMax"
              min={draft.priceMin || "0"}
              step="0.01"
              value={draft.priceMax || ""}
              onChange={change}
              placeholder="Any"
            />
          </label>
        </div>
      )}
      <div className="murza-filter-fields">
        <label>
          Sort by
          <select name="sortBy" value={draft.sortBy || ""} onChange={change}>
            <option value="">Default</option>
            <option value={parcel ? "pickupDate" : "departureDate"}>
              Departure date
            </option>
            {parcel && <option value="price">Price</option>}
          </select>
        </label>
        <label>
          Order
          <select
            name="sortDirection"
            value={draft.sortDirection || "ASC"}
            onChange={change}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </label>
      </div>
      <div className="murza-filter-actions">
        <button className="murza-button murza-button-small" type="submit">
          Apply filters
        </button>
        <button
          type="button"
          onClick={() => {
            setDraft({});
            onResetFilters();
          }}
        >
          Reset filters
        </button>
      </div>
    </form>
  );
};
export default RequestsFilterPanel;
