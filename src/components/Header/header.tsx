import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import PortraitIcon from "@mui/icons-material/Portrait";
import StadiumIcon from "@mui/icons-material/Stadium";
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { ROUTE_LIST } from "../../router/routes.ts";
import { DrawerNavigation } from "../DrawerNavigation/drawerNavigation.tsx";
import { useRootStore } from "../../store/StoreContext.tsx";
import {
  flexCenterStyle,
  headerTitleStyles,
  homepageLinkStyles,
  toolbarContainerStyle,
} from "./styles";

export const Header = observer(function Header() {
  const {
    userStore: { logoutUser, userProfile },
  } = useRootStore();

  const [openDrawer, setOpenDrawer] = useState(false);
  const navigation = useNavigate();

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const handleLogout = () => {
    logoutUser();
    navigation(ROUTE_LIST.AUTH);
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
            <Divider orientation="vertical" sx={{ margin: "0 0.5rem" }} />

            <Typography>{userProfile?.username}</Typography>
            <IconButton size="large">
              <PortraitIcon />
            </IconButton>

            <Divider orientation="vertical" sx={{ margin: "0 0.5rem" }} />

            <IconButton onClick={handleLogout} size="large">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
});
