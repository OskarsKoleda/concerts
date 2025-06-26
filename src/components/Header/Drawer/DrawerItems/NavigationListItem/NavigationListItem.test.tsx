import { ListItemButton } from "@mui/material";
import { expect } from "vitest";

import { renderWithProviders } from "../../../../../common/utils/testingUtils.tsx";

import NavigationListItem from "./NavigationListItem.tsx";

const mockedListItem = {
  selected: false,
  label: "Concerts List",
  to: "/events",
  icon: <ListItemButton />,
};

test("navigationListItem should be rendered correctly", () => {
  const { container } = renderWithProviders(<NavigationListItem {...mockedListItem} />);

  expect(container).toMatchSnapshot();
});
