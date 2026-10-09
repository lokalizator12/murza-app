import React from "react";
import { render } from "@testing-library/react";
import TripStep3 from "./TripStep3";
test("cannot publish an untouched trip or one whose arrival is before departure", () => {
  const enabled = jest.fn();
  const { rerender } = render(
    <TripStep3
      formData={{}}
      handleChange={() => {}}
      setIsNextEnabled={enabled}
    />,
  );
  expect(enabled).toHaveBeenLastCalledWith(false);
  const data = {
    title: "Warsaw to Gdansk",
    description: "Space for a box",
    departureDate: "2026-11-20T10:00",
    destinationDate: "2026-11-19T10:00",
  };
  rerender(
    <TripStep3
      formData={data}
      handleChange={() => {}}
      setIsNextEnabled={enabled}
    />,
  );
  expect(enabled).toHaveBeenLastCalledWith(false);
  rerender(
    <TripStep3
      formData={{ ...data, destinationDate: "2026-11-20T15:00" }}
      handleChange={() => {}}
      setIsNextEnabled={enabled}
    />,
  );
  expect(enabled).toHaveBeenLastCalledWith(true);
});
