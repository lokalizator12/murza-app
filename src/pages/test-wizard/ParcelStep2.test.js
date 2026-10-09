import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ParcelStep2 from "./ParcelStep2";
jest.mock("../../components/ImageCarousel", () => ({ images }) => (
  <div>{images.map((file) => file.name).join(", ")}</div>
));
test("restores photos on returning to the step and computes volume from the updated dimensions in cubic metres", () => {
  const change = jest.fn(),
    enable = jest.fn();
  render(
    <ParcelStep2
      formData={{
        weight: 2,
        length: 20,
        width: 30,
        height: 10,
        images: [{ name: "parcel.png" }],
      }}
      handleChange={change}
      setIsNextEnabled={enable}
    />,
  );
  expect(screen.getByText("parcel.png")).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Length (cm)"), {
    target: { value: "40" },
  });
  expect(change).toHaveBeenCalledWith("volume", 0.012);
  expect(change).toHaveBeenCalledWith("size", "40 × 30 × 10 cm");
  expect(enable).toHaveBeenCalledWith(true);
});
