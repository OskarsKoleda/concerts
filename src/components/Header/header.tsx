import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import PortraitIcon from "@mui/icons-material/Portrait";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import StadiumIcon from "@mui/icons-material/Stadium";
import { AppBar, Box, IconButton, Link, Toolbar, Tooltip, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink } from "react-router-dom";
import { useRootStore } from "../../store/StoreContext";
import { ROUTE_LIST } from "../../router/routes.ts";
import {
  flexCenterStyle,
  headerTitleStyles,
  homepageLinkStyles,
  toolbarContainerStyle,
} from "./styles";

export const Header = observer(function Header() {
  const {
    applicationStore: { toggleDrawer, toggleConcertsView, setActiveMenuItem },
  } = useRootStore();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={toolbarContainerStyle}>
          <Box sx={flexCenterStyle}>
            <IconButton onClick={toggleDrawer} size="large">
              <MenuIcon />
            </IconButton>

            <Link
              component={RouterLink}
              sx={homepageLinkStyles}
              onClick={() => setActiveMenuItem("Home")}
              to={ROUTE_LIST.HOMEPAGE}
            >
              <HomeIcon color="action" fontSize="large" />
              <Typography variant="h3" sx={headerTitleStyles}>
                Event Tracker
              </Typography>
            </Link>
          </Box>

          <Box sx={flexCenterStyle}>
            <Link
              component={RouterLink}
              onClick={() => setActiveMenuItem("View Events")}
              to={ROUTE_LIST.EVENTS}
            >
              <Tooltip title="View Event">
                <IconButton size="large">
                  <StadiumIcon />
                </IconButton>
              </Tooltip>
            </Link>

            <Link
              component={RouterLink}
              onClick={() => setActiveMenuItem("Add Event")}
              to={ROUTE_LIST.NEW_EVENT}
            >
              <Tooltip title="Add Event">
                <IconButton size="large">
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Link>

            <Tooltip title="Change View">
              <IconButton onClick={toggleConcertsView} size="large">
                <RemoveRedEye />
              </IconButton>
            </Tooltip>

            <IconButton size="large">
              <PortraitIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
});
