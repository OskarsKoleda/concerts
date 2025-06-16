import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../common/utils/testingUtils";

import ContentLoader from "./ContentLoader";

describe("ContentLoader", () => {
  test("should correctly render content loader", () => {
    renderWithProviders(
      <ContentLoader isLoading={true}>
        <h1>Welcome!</h1>
      </ContentLoader>,
    );

    const loader = screen.getByRole("progressbar");

    expect(loader).toBeInTheDocument();
  });

  test("should not render content loader", () => {
    renderWithProviders(
      <ContentLoader isLoading={false}>
        <h1>Welcome!</h1>
      </ContentLoader>,
    );

    const loader = screen.queryByRole("progressbar");
    const heading = screen.getByRole("heading");

    expect(loader).toBeNull();
    expect(heading).toBeInTheDocument();
  });
});
