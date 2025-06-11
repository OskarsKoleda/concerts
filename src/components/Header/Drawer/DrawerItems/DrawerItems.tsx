import { Box, Drawer, List } from "@mui/material";
import { useLocation } from "react-router-dom";
import { memo, useMemo } from "react";
import type { DrawerItem } from "../types.ts";
import NavigationListItem from "./NavigationListItem/NavigationListItem.tsx";
import { drawerStyles } from "./styles.ts";

interface DrawerItemsProps {
  drawerItems: DrawerItem[];
  showDrawer: boolean;
  toggleDrawer: () => void;
}

const DrawerItems = ({ drawerItems, showDrawer, toggleDrawer }: DrawerItemsProps) => {
  const location = useLocation();

  const drawerListItems = useMemo(
    () =>
      drawerItems.map((item) => {
        return (
          <NavigationListItem
            key={item.label}
            selected={location.pathname === item.path}
            to={item.path}
            label={item.label}
            icon={item.icon}
          />
        );
      }),
    [drawerItems, location],
  );

  return (
    <Drawer onClose={toggleDrawer} open={showDrawer}>
      <Box sx={drawerStyles} onClick={toggleDrawer}>
        <List>{drawerListItems}</List>
      </Box>
    </Drawer>
  );
};

export default memo(DrawerItems);
