import AddIcon from "@mui/icons-material/Add";
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
import { observer } from "mobx-react-lite";
import { ROUTE_LIST } from "../../router/routes.ts";
import { useRootStore } from "../../store/StoreContext.tsx";
import {
  flexCenterStyle,
  headerTitleStyles,
  homepageLinkStyles,
  toolbarContainerStyle,
} from "./styles";
import Drawer from "./Drawer/Drawer.tsx";

// TODO: think about memo
const Header = () => {
  const {
    userStore: { logoutUser, userProfile },
  } = useRootStore();

  const navigation = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigation(`${ROUTE_LIST.AUTH}/?mode=login`);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={toolbarContainerStyle}>
          <Box sx={flexCenterStyle}>
            <Drawer />

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

            {userProfile ? (
              <>
                <Divider orientation="vertical" sx={{ margin: "0 0.5rem" }} />
                <Typography mr={1}>{userProfile?.username}</Typography>
                <IconButton size="large">
                  <PortraitIcon />
                </IconButton>
                <Divider orientation="vertical" sx={{ margin: "0 0.5rem" }} />
                <IconButton onClick={handleLogout} size="large">
                  <LogoutIcon />
                </IconButton>
              </>
            ) : null}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default observer(Header);
