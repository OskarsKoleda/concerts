import { render, screen } from "@testing-library/react";

import EventBands from "./EventBands";

const mockedEventBands = ["Band A", "Band B"];

describe("EventBands", () => {
  it("renders bands correctly", () => {
    render(<EventBands bands={mockedEventBands} />);
    expect(screen.getByText("Band A")).toBeInTheDocument();
    expect(screen.getByText("Band B")).toBeInTheDocument();
  });

  it("renders no bands correctly", () => {
    const { container } = render(<EventBands bands={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders null correctly", () => {
    const { container } = render(<EventBands bands={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });
});
