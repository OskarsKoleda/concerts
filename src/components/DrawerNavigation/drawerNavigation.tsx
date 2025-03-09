import { Box, Drawer, List } from "@mui/material";
import { useLocation } from "react-router-dom";
import { NavListItem } from "./NavigationListItem/navigationListItem";

import { menuItems } from "./constants";
import { drawerStyles } from "./styles.ts";

type DrawerNavigationProps = {
  drawerIsOpen: boolean;
  toggleDrawer: () => void;
};

export const DrawerNavigation = (props: DrawerNavigationProps) => {
  const { drawerIsOpen, toggleDrawer } = props;
  const url = useLocation();

  return (
    <Drawer onClose={toggleDrawer} open={drawerIsOpen}>
      <Box sx={drawerStyles} onClick={toggleDrawer}>
        <List>
          {menuItems.map((item) => {
            return (
              <NavListItem
                key={item.label}
                selected={url.pathname === item.path}
                to={item.path}
                label={item.label}
                icon={item.icon}
              />
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};
