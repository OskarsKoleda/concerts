import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../common/utils/testingUtils";

import EventImage from "./EventImage";

describe("renders fallback text when image is not provided", () => {
  test("renders with default image", () => {
    renderWithProviders(<EventImage eventTitle="Test Event" />);

    const noImageText = screen.getByText("No Image");

    expect(noImageText).toBeInTheDocument();
  });

  test("renders with provided image", () => {
    const testImage = "https://example.com/test-image.jpg";
    renderWithProviders(<EventImage eventTitle="Test Event" posterImageUrl={testImage} />);

    const imageElement = screen.getByRole("img", { name: "Test Event" });

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", testImage);
  });
});
