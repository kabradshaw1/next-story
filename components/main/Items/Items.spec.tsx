import { render, screen } from "@testing-library/react";

import Items from "./Items";

describe("Items Component", () => {
  describe("Items Component", () => {
    it("displays no image text when imageUrl is missing", () => {
      render(<Items title="Item 1" text="Text 1" imageUrl="/test.png" />);
      expect(screen.getByText("Item 1")).toBeInTheDocument();
    });
  });
});
