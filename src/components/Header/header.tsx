import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import PortraitIcon from "@mui/icons-material/Portrait";
import StadiumIcon from "@mui/icons-material/Stadium";
import { AppBar, Box, IconButton, Link, Toolbar, Tooltip, Typography } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { ROUTE_LIST } from "../../router/routes.ts";
import { DrawerNavigation } from "../DrawerNavigation/drawerNavigation.tsx";
import {
  flexCenterStyle,
  headerTitleStyles,
  homepageLinkStyles,
  toolbarContainerStyle,
} from "./styles";

export const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={toolbarContainerStyle}>
          <Box sx={flexCenterStyle}>
            <DrawerNavigation drawerIsOpen={openDrawer} toggleDrawer={toggleDrawer} />
            <IconButton onClick={toggleDrawer} size="large">
              <MenuIcon />
            </IconButton>

            <Link component={RouterLink} sx={homepageLinkStyles} to={ROUTE_LIST.HOMEPAGE}>
              <HomeIcon color="action" fontSize="large" />
              <Typography variant="h3" sx={headerTitleStyles}>
                Event Tracker
              </Typography>
            </Link>
          </Box>

          <Box sx={flexCenterStyle}>
            <Link component={RouterLink} to={ROUTE_LIST.EVENTS}>
              <Tooltip title="View Event">
                <IconButton size="large">
                  <StadiumIcon />
                </IconButton>
              </Tooltip>
            </Link>

            <Link component={RouterLink} to={ROUTE_LIST.NEW_EVENT}>
              <Tooltip title="Add Event">
                <IconButton size="large">
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Link>

            <IconButton size="large">
              <PortraitIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
