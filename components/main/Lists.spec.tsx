import { render, screen } from "@testing-library/react";

import Lists from "./Lists";

describe("Lists Component", () => {
  it("renders Items when props are provided", () => {
    const props = [
      { title: "Item 1", text: "Description 1", imageUrl: "/url1" },
      { title: "Item 2", text: "Description 2", imageUrl: "/url2" },
    ];
    render(<Lists props={props} route="test-route" />);
    const itemTitles = screen.getAllByText(/Item/);
    expect(itemTitles).toHaveLength(2);
  });

  it("renders NoItems when props array is empty", () => {
    render(<Lists props={[]} route="test-route" />);
    expect(screen.getByText(/No test-route found./)).toBeInTheDocument();
  });

it("passes correct props to Items components", () => {
  const props = [
    { title: "Item 1", text: "Text 1", imageUrl: "/img1" },
    { title: "Item 2", text: "Text 2", imageUrl: "/img2" },
  ];
  render(<Lists props={props} route="items" />);

  props.forEach((prop) => {
    expect(screen.getByText(prop.title)).toBeInTheDocument();
    expect(screen.getByText(prop.text)).toBeInTheDocument();
    const image = screen.getByAltText(`Image of ${prop.title}`) as HTMLImageElement;
    // Just check that the src attribute is not empty and includes some URL path
    expect(image.src).toBeTruthy(); // Checks if src is truthy (not null, undefined, or empty)
    expect(image.src).toContain("/_next/image"); // Checks if src includes the expected processed path
  });
});

  });
});
