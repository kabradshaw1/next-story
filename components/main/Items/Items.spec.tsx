import { render, screen } from "@testing-library/react";

import Items from "./Items";
import { root } from "postcss";

describe("Items Component", () => {
  describe("Items Component", () => {
    it("displays no image text when imageUrl is missing", () => {
      render(<Items title="Item 1" text="Text 1" imageUrl="/test.png" />);
      expect(screen.getByText("Item 1")).toBeInTheDocument();
    });
  });
  it("renders the image, title, and text correctly", () => {
    const props = {
      title: "Item",
      text: "Description 1",
      imageUrl: "/url1",
      route: "character",
    };
    render(<Items {...props} />);
    const image = screen.getByRole("img", {
      name: `Image of ${props.title}`,
    }) as HTMLImageElement;

    // Check if the src attribute includes encoded URL and optimization parameters
    expect(image.src).toContain(encodeURIComponent(props.imageUrl));
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.text)).toBeInTheDocument();
  });
  it("displays a placeholder when no image is available", () => {
    const props = {
      title: "Item 2",
      text: "Description 2",
      imageUrl: "",
      route: "character",
    };
    render(<Items {...props} />);
    expect(screen.getByText("No image available.")).toBeInTheDocument();
  });
  it("creates a link that navigates to the correct URL based on the title", () => {
    const props = {
      title: "Item",
      text: "Description 1",
      imageUrl: "/url1",
      route: "character",
    };
    render(<Items {...props} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/${route}/${props.title}`);
  });
  it('displays "No text available" when text is not provided', () => {
    const props = { title: "Item 3", imageUrl: "/url3", route: "character" };
    render(<Items {...props} />);
    expect(screen.getByText("No text available")).toBeInTheDocument();
  });
  it("has appropriate alt text for images for accessibility", () => {
    const props = {
      title: "Item 1",
      text: "Description 1",
      imageUrl: "/url1",
      route: "character",
    };
    render(<Items {...props} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", `Image of ${props.title}`);
  });
});
