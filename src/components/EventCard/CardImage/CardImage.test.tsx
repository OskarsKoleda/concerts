import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../common/utils/testingUtils";

import CardImage from "./CardImage";

describe("renders fallback text when card image is not provided", () => {
  test("renders with default image", () => {
    renderWithProviders(<CardImage imageTitle="Test Event" />);

    const noImageText = screen.getByText("No Image");

    expect(noImageText).toBeInTheDocument();
  });

  test("renders with provided image", () => {
    const testImage = "https://example.com/test-image.jpg";

    renderWithProviders(<CardImage imageTitle="Test Event" imageUrl={testImage} />);

    const imageElement = screen.getByRole("img", { name: "Test Event" });

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", testImage);
  });
});
