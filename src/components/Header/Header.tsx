import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import StadiumIcon from "@mui/icons-material/Stadium";
import { AppBar, Box, IconButton, Link, Toolbar, Tooltip, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link as RouterLink } from "react-router-dom";
import { ROUTE_LIST } from "../../router/routes.ts";
import { useRootStore } from "../../store/StoreContext.tsx";
import Drawer from "./Drawer/DrawerItems/Drawer.tsx";
import {
  appTitleStyles,
  centeredIconContainerStyles,
  headerToolbarStyles,
  homepageLinkStyles,
} from "./styles";
import UserActions from "./UserActions/UserActions.tsx";

const Header = () => {
  const {
    userStore: { userProfile },
  } = useRootStore();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={headerToolbarStyles}>
          <Box sx={centeredIconContainerStyles}>
            <Drawer />

            <Link component={RouterLink} sx={homepageLinkStyles} to={ROUTE_LIST.HOMEPAGE}>
              <HomeIcon color="action" fontSize="large" />
              <Typography variant="h3" sx={appTitleStyles}>
                Event Tracker
              </Typography>
            </Link>
          </Box>

          <Box sx={centeredIconContainerStyles}>
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

            {userProfile && <UserActions />}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default observer(Header);
