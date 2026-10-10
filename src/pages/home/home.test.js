import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./home";
const mockNavigate = jest.fn();
jest.mock(
  "react-router-dom",
  () => ({
    Link: ({ to, children, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
    useNavigate: () => mockNavigate,
  }),
  { virtual: true },
);
jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ isAuthenticated: false }),
}));
beforeEach(() => mockNavigate.mockClear());

test("preserves a trimmed route through the login destination", () => {
  render(<Home />);
  fireEvent.change(screen.getByRole("textbox", { name: "From" }), {
    target: { value: " Warsaw " },
  });
  fireEvent.change(screen.getByRole("textbox", { name: "To" }), {
    target: { value: "Gdańsk" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Find a traveller" }));
  const destination = new URLSearchParams(
    mockNavigate.mock.calls[0][0].split("?")[1],
  ).get("next");
  const query = new URLSearchParams(destination.split("?")[1]);
  expect(destination.split("?")[0]).toBe("/main");
  expect(query.get("type")).toBe("trip");
  expect(query.get("from")).toBe("Warsaw");
  expect(query.get("to")).toBe("Gdańsk");
  expect(
    screen.getByText(/Live parcel tracking is not available/i),
  ).toBeInTheDocument();
});

test("switches to carrying parcels and swaps the route before searching", () => {
  render(<Home />);
  fireEvent.change(screen.getByRole("textbox", { name: "From" }), {
    target: { value: "Warsaw" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: "To" }), {
    target: { value: "Berlin" },
  });
  fireEvent.click(screen.getByRole("radio", { name: "Carry a parcel" }));
  fireEvent.click(
    screen.getByRole("button", { name: "Swap departure and destination" }),
  );
  expect(screen.getByRole("textbox", { name: "From" })).toHaveValue("Berlin");
  screen
    .getAllByRole("link", { name: "Post a trip" })
    .forEach((link) =>
      expect(link.getAttribute("href")).toContain("create%3Dtrip"),
    );
  fireEvent.click(
    screen.getByRole("button", { name: "Find parcels to carry" }),
  );
  const next = new URLSearchParams(
    mockNavigate.mock.calls[0][0].split("?")[1],
  ).get("next");
  expect(next).toBe("/main?type=parcel&from=Berlin&to=Warsaw");
});
