import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import PortraitIcon from "@mui/icons-material/Portrait";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import StadiumIcon from "@mui/icons-material/Stadium";
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import homepage from "../../assets/homepage2.png";
import { useRootStore } from "../../store/StoreContext";

import { ROUTE_LIST } from "../../router/routes.ts";
import {
  flexCenterStyle,
  headerTitleStyles,
  homepageIconStyles,
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
              <MenuIcon color="action" />
            </IconButton>

            <Link
              onClick={() => setActiveMenuItem("Home")}
              style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
              to="/"
            >
              <Box component="img" src={homepage} alt="homepage" sx={homepageIconStyles} />
              <Typography sx={headerTitleStyles}>My Events</Typography>
            </Link>
          </Box>

          <Box sx={flexCenterStyle}>
            <Link onClick={() => setActiveMenuItem("View Events")} to="/events">
              <Tooltip title="View Event">
                <IconButton size="large">
                  <StadiumIcon />
                </IconButton>
              </Tooltip>
            </Link>

            <Link onClick={() => setActiveMenuItem("Add Event")} to={ROUTE_LIST.NEW_EVENT}>
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
