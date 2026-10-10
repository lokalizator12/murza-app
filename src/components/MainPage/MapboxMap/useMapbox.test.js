import React, { useRef } from "react";
import { render } from "@testing-library/react";
import useMapbox from "./useMapbox";
import mapboxgl from "mapbox-gl";

const mockMap = {
  addControl: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  remove: jest.fn(),
  resize: jest.fn(),
};
jest.mock(
  "mapbox-gl",
  () => ({ Map: jest.fn(() => mockMap), NavigationControl: jest.fn() }),
  { virtual: true },
);

function Map() {
  const container = useRef(null);
  useMapbox(container);
  return <div ref={container} />;
}

test("resizes when revealed and disconnects the observer on leaving the page", () => {
  mapboxgl.Map.mockImplementation(() => mockMap);
  const previous = global.ResizeObserver;
  let callback;
  const disconnect = jest.fn();
  global.ResizeObserver = jest.fn((handler) => {
    callback = handler;
    return { observe: jest.fn(), disconnect };
  });
  mockMap.resize.mockClear();
  try {
    const { unmount } = render(<Map />);
    callback([{ contentRect: { width: 0, height: 0 } }]);
    expect(mockMap.resize).not.toHaveBeenCalled();
    callback([{ contentRect: { width: 390, height: 500 } }]);
    expect(mockMap.resize).toHaveBeenCalledTimes(1);
    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(mockMap.remove).toHaveBeenCalled();
  } finally {
    global.ResizeObserver = previous;
  }
});
