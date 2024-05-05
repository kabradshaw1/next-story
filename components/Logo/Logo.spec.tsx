import { render, screen } from "@testing-library/react";

import Logo from "./Logo";

describe("Logo", () => {
  beforeEach(() => {
    render(<Logo />);
  });

  it("given_whenRendered_thenImageLoads", async () => {
    // given

    // when rendered in beforeEach

    // then
    const logoImage = screen.getByAltText(/Logo Image/i);
    expect(logoImage).toBeInTheDocument();
  });

  it("given_whenRendered_thenAltTextPresent", async () => {
    // given

    // when

    // then
    const logoImage = screen.getByAltText("Logo Image");
    expect(logoImage).toHaveAttribute("alt", "Logo Image");
  });
});
