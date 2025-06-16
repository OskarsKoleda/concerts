import { describe, expect, it } from "vitest";
import { ListItemButton } from "@mui/material";

import { renderWithProviders } from "../../../../../common/utils/testingUtils.tsx";

import NavigationListItem from "./NavigationListItem.tsx";

const props = {
  selected: false,
  label: "Concerts List",
  to: "/events",
  icon: <ListItemButton />,
};

describe("navigationListItem", () => {
  it("should be rendered correctly", () => {
    const { container } = renderWithProviders(<NavigationListItem {...props} />);

    expect(container).toMatchSnapshot();
  });
});
