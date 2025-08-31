import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";

import { renderWithProviders } from "../../common/utils/testingUtils";

import Card from "./Card";

describe("Card (generic)", () => {
  const mockOnClick = vi.fn();

  const defaultProps = {
    cardActionButtonTitle: "Click Me",
    onCardActionClick: mockOnClick,
    imageUrl: "https://example.com/image.jpg",
    imageTitle: "Sample Image",
    header: <div data-testid="header">Header Content</div>,
    body: <div data-testid="body">Body Content</div>,
    footer: <div data-testid="footer">Footer Content</div>,
  };

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("renders image when imageUrl is provided", () => {
    renderWithProviders(<Card {...defaultProps} />);
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", defaultProps.imageUrl);
    expect(img).toHaveAttribute("alt", defaultProps.imageTitle);
  });

  it("does not render image when imageUrl is not provided", () => {
    renderWithProviders(<Card {...defaultProps} imageUrl={undefined} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders header, body, and footer", () => {
    renderWithProviders(<Card {...defaultProps} />);
    expect(screen.getByTestId("header")).toHaveTextContent("Header Content");
    expect(screen.getByTestId("body")).toHaveTextContent("Body Content");
    expect(screen.getByTestId("footer")).toHaveTextContent("Footer Content");
  });

  it("renders only body when header and footer are not provided", () => {
    renderWithProviders(
      <Card
        cardActionButtonTitle="Click"
        onCardActionClick={mockOnClick}
        imageTitle="img"
        body={<div data-testid="body">Body Only</div>}
      />,
    );
    expect(screen.getByTestId("body")).toHaveTextContent("Body Only");
    expect(screen.queryByTestId("header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer")).not.toBeInTheDocument();
  });

  it("renders action button with correct title and triggers callback on click", () => {
    renderWithProviders(<Card {...defaultProps} />);
    const button = screen.getByRole("button", { name: defaultProps.cardActionButtonTitle });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
