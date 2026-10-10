import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Dialog, Pagination } from "@mui/material";
import MapboxMap from "../../components/MainPage/MapboxMap/MapboxMap";
import RequestsFilter from "../../components/MainPage/RequestsFilter";
import RequestsList from "../../components/MainPage/RequestsList";
import RequestDetailsModal from "../../components/MainPage/RequestDetailsModal";
import RequestsFilterPanel from "../../components/MainPage/RequestsFilterPanel";
import MurzaGuide from "../../components/MurzaGuide";
import RequestForm from "../test-wizard/MainFormRequest";
import axios from "../../axiosConfig";
import "./MainPage.css";

const filtersFromSearch = (params, type) => {
  const keys =
    type === "trip"
      ? ["departureAddress", "destinationAddress"]
      : ["pickupAddress", "deliveryAddress", "priceMin", "priceMax"];
  const result = {};
  [...keys, "dateFrom", "dateTo", "sortBy", "sortDirection"].forEach((key) => {
    const value = params.get(key)?.trim();
    if (value) result[key] = value;
  });
  const from = params.get("from")?.trim();
  const to = params.get("to")?.trim();
  if (from) result[keys[0]] = from;
  if (to) result[keys[1]] = to;
  return result;
};

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedType = searchParams.get("type") === "trip" ? "trip" : "parcel";
  const requestedCreate = searchParams.get("create");
  const [currentFilter, setCurrentFilter] = useState(requestedType);
  const [requests, setRequests] = useState({ parcel: [], trip: [] });
  const [mapRequests, setMapRequests] = useState({ parcel: [], trip: [] });
  const [totalPages, setTotalPages] = useState({ parcel: 0, trip: 0 });
  const [pages, setPages] = useState({ parcel: 0, trip: 0 });
  const [filters, setFilters] = useState(() =>
    filtersFromSearch(searchParams, requestedType),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestKind, setRequestKind] = useState(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [mobileView, setMobileView] = useState("list");
  const requestSequence = useRef(0);

  const requestedSearch = searchParams.toString();
  useEffect(() => {
    setCurrentFilter(requestedType);
    const next = filtersFromSearch(
      new URLSearchParams(requestedSearch),
      requestedType,
    );
    setFilters((previous) =>
      JSON.stringify(previous) === JSON.stringify(next) ? previous : next,
    );
  }, [requestedType, requestedSearch]);
  useEffect(() => {
    if (requestedCreate === "parcel" || requestedCreate === "trip") {
      setRequestKind(requestedCreate);
      setShowRequestDialog(true);
    }
  }, [requestedCreate]);

  const fetchMapRequests = useCallback(async () => {
    try {
      const [trips, parcels] = await Promise.all([
        axios.get("/trip-requests/list-map"),
        axios.get("/parcel-requests/list-map"),
      ]);
      setMapRequests({ trip: trips.data || [], parcel: parcels.data || [] });
    } catch (fetchError) {
      // The list remains usable when map markers fail to load.
      console.error("Unable to load map markers", fetchError);
    }
  }, []);

  const fetchRequests = useCallback(async (type, page, activeFilters) => {
    const sequence = ++requestSequence.current;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), size: "7" });
      Object.entries(activeFilters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "")
          params.set(key, String(value));
      });
      const endpoint = type === "parcel" ? "parcel-requests" : "trip-requests";
      const response = await axios.get(`/${endpoint}/list-summary?${params}`);
      if (sequence !== requestSequence.current) return;
      setRequests((previous) => ({
        ...previous,
        [type]: response.data.content || [],
      }));
      setTotalPages((previous) => ({
        ...previous,
        [type]: response.data.totalPages || 0,
      }));
    } catch (fetchError) {
      if (sequence !== requestSequence.current) return;
      setError("Requests could not be loaded. Please try again.");
      setRequests((previous) => ({ ...previous, [type]: [] }));
      console.error("Unable to load requests", fetchError);
    } finally {
      if (sequence === requestSequence.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests(currentFilter, pages[currentFilter], filters);
    return () => {
      requestSequence.current += 1;
    };
  }, [currentFilter, pages, filters, fetchRequests]);
  useEffect(() => {
    fetchMapRequests();
  }, [fetchMapRequests]);

  const handleFilterChange = (type) => {
    setCurrentFilter(type);
    setFilters({});
    setPages((previous) => ({ ...previous, [type]: 0 }));
    setSearchParams({ type });
  };
  const handleApplyFilters = (nextFilters) => {
    setPages((previous) => ({ ...previous, [currentFilter]: 0 }));
    setFilters(nextFilters);
    setSearchParams({ type: currentFilter, ...nextFilters });
  };
  const handleOpenRequestDialog = (kind) => {
    setRequestKind(kind);
    setShowRequestDialog(true);
    setSearchParams({ type: currentFilter, ...filters, create: kind });
  };
  const handleCloseRequestDialog = () => {
    setShowRequestDialog(false);
    setRequestKind(null);
    setSearchParams({ type: currentFilter, ...filters });
  };
  const refreshRequestsData = () => {
    fetchRequests(currentFilter, pages[currentFilter], filters);
    fetchMapRequests();
  };
  const handleRequestSelect = async (requestId, type = currentFilter) => {
    try {
      const endpoint = type === "parcel" ? "parcel-requests" : "trip-requests";
      const response = await axios.get(`/${endpoint}/${requestId}`);
      setSelectedRequest({ data: response.data, type });
    } catch (fetchError) {
      setError("Request details could not be loaded. Please try again.");
      console.error("Unable to load request details", fetchError);
    }
  };

  const hasFilters = Object.keys(filters).length > 0;
  const idKey = currentFilter === "parcel" ? "idParcel" : "idTrip";
  const visibleIds = new Set(
    requests[currentFilter].map((request) => request[idKey]),
  );
  const visibleMapRequests = hasFilters
    ? {
        ...mapRequests,
        [currentFilter]: loading
          ? []
          : mapRequests[currentFilter].filter((request) =>
              visibleIds.has(request[idKey]),
            ),
      }
    : mapRequests;

  return (
    <main className="murza-board">
      <div className="murza-board-head">
        <div className="murza-container murza-board-head-inner">
          <div>
            <h1>Parcels & trips</h1>
            <p>
              Find a route, check the details and contact the sender or
              traveller.
            </p>
          </div>
          <div
            className="murza-board-view"
            role="group"
            aria-label="View requests"
          >
            <button
              type="button"
              aria-pressed={mobileView === "list"}
              aria-controls="murza-request-results"
              onClick={() => setMobileView("list")}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1" />
              </svg>
              List
            </button>
            <button
              type="button"
              aria-pressed={mobileView === "map"}
              aria-controls="murza-request-map"
              onClick={() => setMobileView("map")}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2Zm6-2v16m6-14v16" />
              </svg>
              Map
            </button>
          </div>
        </div>
      </div>
      <div className="murza-board-workspace" data-mobile-view={mobileView}>
        <aside className="murza-board-sidebar" aria-label="Requests">
          <div className="murza-board-actions">
            <button
              className="murza-button murza-button-small"
              type="button"
              onClick={() => handleOpenRequestDialog("parcel")}
            >
              Post a parcel
            </button>
            <button
              className="murza-button murza-button-outline murza-button-small"
              type="button"
              onClick={() => handleOpenRequestDialog("trip")}
            >
              Post a trip
            </button>
          </div>
          <RequestsFilter
            currentFilter={currentFilter}
            onFilterChange={handleFilterChange}
          />
          {Object.keys(filters).length > 0 && (
            <div className="murza-route-filter-summary">
              <span>
                {currentFilter === "trip"
                  ? filters.departureAddress || "Any departure"
                  : filters.pickupAddress || "Any departure"}{" "}
                to{" "}
                {currentFilter === "trip"
                  ? filters.destinationAddress || "Any destination"
                  : filters.deliveryAddress || "Any destination"}
                {filters.dateFrom ||
                filters.dateTo ||
                filters.priceMin ||
                filters.priceMax
                  ? " (additional filters)"
                  : ""}
              </span>
              <button type="button" onClick={() => handleApplyFilters({})}>
                Clear
              </button>
            </div>
          )}
          <button
            className="murza-filter-toggle"
            type="button"
            onClick={() => setIsFilterPanelOpen((open) => !open)}
            aria-expanded={isFilterPanelOpen}
            aria-controls="murza-filters"
          >
            {isFilterPanelOpen ? "Hide filters" : "Show filters"}{" "}
            <span aria-hidden="true">{isFilterPanelOpen ? "−" : "+"}</span>
          </button>
          {isFilterPanelOpen && (
            <div id="murza-filters">
              <RequestsFilterPanel
                onApplyFilters={handleApplyFilters}
                onResetFilters={() => handleApplyFilters({})}
                currentFilter={currentFilter}
                activeFilters={filters}
              />
            </div>
          )}
          {error && (
            <div className="murza-board-error" role="alert">
              {error}{" "}
              <button
                type="button"
                onClick={() =>
                  fetchRequests(currentFilter, pages[currentFilter], filters)
                }
              >
                Retry
              </button>
            </div>
          )}
          <div id="murza-request-results">
            <div className="murza-list-heading">
              <h2>
                {currentFilter === "parcel"
                  ? "Parcel requests"
                  : "Available trips"}
              </h2>
              <span>
                {loading
                  ? "Loading…"
                  : `${requests[currentFilter].length} shown`}
              </span>
            </div>

            {loading ? (
              <div className="murza-board-status" role="status">
                Loading requests…
              </div>
            ) : (
              <RequestsList
                requests={requests[currentFilter]}
                currentFilter={currentFilter}
                onSelectRequest={(id) => handleRequestSelect(id)}
              />
            )}
            {totalPages[currentFilter] > 1 && (
              <div className="murza-board-pagination">
                <Pagination
                  count={totalPages[currentFilter]}
                  page={pages[currentFilter] + 1}
                  onChange={(_, page) =>
                    setPages((previous) => ({
                      ...previous,
                      [currentFilter]: page - 1,
                    }))
                  }
                />
              </div>
            )}
          </div>
        </aside>
        <section
          id="murza-request-map"
          className="murza-board-map"
          aria-label="Request map"
        >
          <MapboxMap
            mapParcels={visibleMapRequests.parcel}
            mapDrivers={visibleMapRequests.trip}
            selectedType={currentFilter}
            onRequestSelect={handleRequestSelect}
          />
          <div className="murza-map-scope">
            <span>
              {hasFilters
                ? loading
                  ? "Updating filtered routes…"
                  : "Filtered requests from this list page"
                : `All active ${currentFilter === "parcel" ? "parcels" : "trips"}`}
            </span>
            <button type="button" onClick={() => setMobileView("list")}>
              Back to list
            </button>
          </div>
          <MurzaGuide />
        </section>
      </div>
      <Dialog
        open={showRequestDialog}
        onClose={handleCloseRequestDialog}
        fullWidth
        maxWidth="md"
      >
        <RequestForm
          key={requestKind || "choose"}
          initialType={requestKind}
          onClose={handleCloseRequestDialog}
          onRefreshData={refreshRequestsData}
        />
      </Dialog>
      {selectedRequest && (
        <RequestDetailsModal
          open
          onClose={() => setSelectedRequest(null)}
          request={selectedRequest.data}
          requestType={selectedRequest.type}
        />
      )}
    </main>
  );
};
export default MainPage;
