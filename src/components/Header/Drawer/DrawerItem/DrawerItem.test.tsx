import { ListItemButton } from "@mui/material";
import { expect } from "vitest";

import { renderWithProviders } from "../../../../common/utils/testingUtils.tsx";

import DrawerItem from "./DrawerItem.tsx";

const mockedListItem = {
  selected: false,
  label: "Concerts List",
  to: "/events",
  icon: <ListItemButton />,
};

it("drawerItem should be rendered correctly", () => {
  const { container } = renderWithProviders(<DrawerItem {...mockedListItem} />);

  expect(container).toMatchSnapshot();
});
