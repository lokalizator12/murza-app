import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import RequestsList from "./RequestsList";

test("shows the parcel price and dimensions and opens the correct request", () => {
  const select = jest.fn();
  render(
    <RequestsList
      currentFilter="parcel"
      requests={[
        {
          idParcel: "parcel-1",
          title: "Books",
          price: 12.5,
          size: "20 × 30 × 10 cm",
          pickupAddress: "Warsaw",
          deliveryAddress: "Berlin",
        },
      ]}
      onSelectRequest={select}
    />,
  );
  expect(screen.getByLabelText("Proposed price")).toHaveTextContent("€12.50");
  expect(screen.getByText("Size: 20 × 30 × 10 cm")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "View details" }));
  expect(select).toHaveBeenCalledWith("parcel-1");
});

test("shows the trip transport without fabricating a price", () => {
  render(
    <RequestsList
      currentFilter="trip"
      requests={[
        {
          idTrip: 4,
          driverFirstName: "Anna",
          shippingMethod: { methodName: "Train" },
        },
      ]}
      onSelectRequest={() => {}}
    />,
  );
  expect(screen.getByText("Travelling by train")).toBeInTheDocument();
  expect(screen.queryByLabelText("Proposed price")).not.toBeInTheDocument();
});
