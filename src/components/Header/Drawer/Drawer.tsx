import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, List, Drawer as MuiDrawer } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { drawerItems } from "./constants";
import DrawerItem from "./DrawerItem/DrawerItem";
import { drawerItemsStyles } from "./styles";

const Drawer = () => {
  const { pathname } = useLocation();
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleShowDrawer = () => {
    setShowDrawer((prev) => !prev);
  };

  return (
    <>
      <MuiDrawer onClose={toggleShowDrawer} open={showDrawer}>
        <Box sx={drawerItemsStyles} onClick={toggleShowDrawer}>
          <List>
            {drawerItems.map(({ label, path, icon }) => (
              <DrawerItem
                key={label}
                selected={pathname === path}
                to={path}
                label={label}
                icon={icon}
              />
            ))}
          </List>
        </Box>
      </MuiDrawer>
      <IconButton onClick={toggleShowDrawer} size="large">
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default Drawer;
