import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import MainPage from "./MainPage";
import axios from "../../axiosConfig";
let mockSearch = "type=trip&from=Warsaw&to=Berlin";

jest.mock(
  "react-router-dom",
  () => ({
    useSearchParams: () => [new URLSearchParams(mockSearch), jest.fn()],
  }),
  { virtual: true },
);
jest.mock("../../components/MurzaGuide", () => () => null);
jest.mock("../../axiosConfig", () => ({ get: jest.fn() }));
jest.mock(
  "../../components/MainPage/MapboxMap/MapboxMap",
  () =>
    ({ mapDrivers }) => (
      <div
        data-testid="map"
        data-trip-ids={mapDrivers.map((request) => request.idTrip).join(",")}
      >
        Map ready
      </div>
    ),
);
jest.mock("../../components/MainPage/RequestDetailsModal", () => () => null);
jest.mock("../test-wizard/MainFormRequest", () => ({ initialType }) => (
  <div>Post {initialType} wizard</div>
));

beforeEach(() => {
  axios.get.mockReset();
  mockSearch = "type=trip&from=Warsaw&to=Berlin";
});

test("opens the requested trip flow and loads trip listings for a landing-page link", async () => {
  mockSearch = "type=trip&create=trip&from=Warsaw&to=Berlin";
  axios.get.mockImplementation((url) => {
    if (url.includes("/list-summary"))
      return Promise.resolve({ data: { content: [], totalPages: 0 } });
    return Promise.resolve({ data: [] });
  });
  render(<MainPage />);
  expect(screen.getByText("Post trip wizard")).toBeInTheDocument();
  expect(screen.getByText("Available trips")).toBeInTheDocument();
  await waitFor(() =>
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(
        "departureAddress=Warsaw&destinationAddress=Berlin",
      ),
    ),
  );
});

test("switches map and list views without reloading results or losing filters", async () => {
  axios.get.mockImplementation((url) =>
    Promise.resolve({
      data: url.includes("/list-summary")
        ? { content: [{ idTrip: 2, driverFirstName: "Anna" }], totalPages: 1 }
        : url.includes("trip-requests")
          ? [{ idTrip: 1 }, { idTrip: 2 }]
          : [],
    }),
  );
  const { container } = render(<MainPage />);
  await waitFor(() =>
    expect(screen.queryByText("Loading requests…")).not.toBeInTheDocument(),
  );
  const calls = axios.get.mock.calls.length;
  fireEvent.click(screen.getByRole("button", { name: "Map" }));
  expect(screen.getByRole("button", { name: "Map" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(container.querySelector(".murza-board-workspace")).toHaveAttribute(
    "data-mobile-view",
    "map",
  );
  expect(screen.getByText("Warsaw to Berlin")).toBeInTheDocument();
  expect(screen.getByTestId("map")).toHaveAttribute("data-trip-ids", "2");
  expect(
    screen.getByText("Filtered requests from this list page"),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "List" }));
  expect(container.querySelector(".murza-board-workspace")).toHaveAttribute(
    "data-mobile-view",
    "list",
  );
  expect(axios.get.mock.calls).toHaveLength(calls);
});

test("ignores a late response from an older search", async () => {
  const pending = [];
  axios.get.mockImplementation((url) => {
    if (url.includes("/list-summary"))
      return new Promise((resolve) => pending.push(resolve));
    return Promise.resolve({ data: [] });
  });
  render(<MainPage />);
  await waitFor(() => expect(pending).toHaveLength(1));
  fireEvent.click(screen.getByRole("button", { name: /Show filters/ }));
  fireEvent.change(screen.getByRole("textbox", { name: "From" }), {
    target: { value: "Gdańsk" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));
  await waitFor(() => expect(pending).toHaveLength(2));
  await act(async () =>
    pending[1]({
      data: {
        content: [
          {
            idTrip: 2,
            driverFirstName: "New route",
            departureAddress: "Gdańsk",
            destinationAddress: "Berlin",
          },
        ],
        totalPages: 1,
      },
    }),
  );
  expect(screen.getByText("Trip by New route")).toBeInTheDocument();
  await act(async () =>
    pending[0]({
      data: {
        content: [{ idTrip: 1, driverFirstName: "Outdated route" }],
        totalPages: 1,
      },
    }),
  );
  expect(screen.getByText("Trip by New route")).toBeInTheDocument();
  expect(screen.queryByText("Trip by Outdated route")).not.toBeInTheDocument();
});
