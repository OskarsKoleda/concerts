import { Box, Drawer, List } from "@mui/material";
import { memo } from "react";
import { useLocation } from "react-router-dom";

import { drawerItems } from "../constants";
import DrawerItem from "../DrawerItem/DrawerItem";
import { drawerItemsStyles } from "../styles";

interface DrawerItemsProps {
  showDrawer: boolean;
  toggleDrawer: () => void;
}

const DrawerItems = ({ showDrawer, toggleDrawer }: DrawerItemsProps) => {
  const { pathname } = useLocation();

  return (
    <Drawer onClose={toggleDrawer} open={showDrawer}>
      <Box sx={drawerItemsStyles} onClick={toggleDrawer}>
        <List>
          {drawerItems.map(({ label, path, icon }) => (
            <DrawerItem
              key={label}
              to={path}
              label={label}
              isSelected={pathname === path}
              icon={icon}
            />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default memo(DrawerItems);
