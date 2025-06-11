import { Box, Drawer, List } from "@mui/material";
import { useLocation } from "react-router-dom";
import { memo, useMemo } from "react";
import NavigationListItem from "./NavigationListItem/NavigationListItem.tsx";
import { drawerItemsStyles } from "./styles.ts";
import { drawerItems } from "../constants.tsx";

interface DrawerItemsProps {
  showDrawer: boolean;
  toggleDrawer: () => void;
}

const DrawerItems = ({ showDrawer, toggleDrawer }: DrawerItemsProps) => {
  const location = useLocation();

  const drawerItemList = useMemo(
    () =>
      drawerItems.map((item) => (
        <NavigationListItem
          key={item.label}
          selected={location.pathname === item.path}
          to={item.path}
          label={item.label}
          icon={item.icon}
        />
      )),
    [drawerItems, location],
  );

  return (
    <Drawer onClose={toggleDrawer} open={showDrawer}>
      <Box sx={drawerItemsStyles} onClick={toggleDrawer}>
        <List>{drawerItemList}</List>
      </Box>
    </Drawer>
  );
};

export default memo(DrawerItems);
