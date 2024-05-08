import { render, screen } from "@testing-library/react";

import Items from "./Items/Items";
import Lists from "./Lists";

jest.mock("./Items/Items", () => {
  return {
    __esModule: true,
    default: jest.fn(({ title }) => <div>{title}</div>), // Mock as a functional component that renders title
  };
});

describe("Lists Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("givenProps_whenRendered_theRenderComponents", () => {
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

  it("givenProps_whenRendered_thenPassProps", () => {
    const props = [
      { title: "Item 1", text: "Text 1", imageUrl: "/img1" },
      { title: "Item 2", text: "Text 2", imageUrl: "/img2" },
    ];
    render(<Lists props={props} route="items" />);
    props.forEach((prop, index) => {
      expect(Items).toHaveBeenNthCalledWith(
        index + 1,
        {
          title: prop.title,
          text: prop.text,
          imageUrl: prop.imageUrl,
        },
        {}
      );
    });
  });
});
