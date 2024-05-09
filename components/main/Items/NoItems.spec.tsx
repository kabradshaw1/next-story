import { render, screen } from "@testing-library/react";

import NoItems from "./NoItems";

describe("NoItems Component", () => {
  it("givenRoute_whenRendered_thenIncludeRouteInButtonText", () => {
    const route = "products";
    render(<NoItems route={route} />);
    expect(screen.getByText(`No ${route} found.`)).toBeInTheDocument();
  });
  it("givenNoErrors_whenRender_thenIncludeHomePageLink", () => {
    render(<NoItems route="products" />);
    const homeLink = screen.getByRole("link", {
      name: "Return to Home Page.",
    });
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
