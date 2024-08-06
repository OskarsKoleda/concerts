import { Typography, AppBar, Toolbar, IconButton, Box, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import MenuIcon from "@mui/icons-material/Menu";
import PortraitIcon from "@mui/icons-material/Portrait";
import StadiumIcon from "@mui/icons-material/Stadium";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

import { useRootStore } from "../../store/StoreContext";

import { flexCenterStyle, toolbarContainerStyle } from "./styles";

export const Header = observer(function Header(): JSX.Element {
  const {
    applicationStore: { toggleDrawer, toggleConcertsView },
  } = useRootStore();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={toolbarContainerStyle}>

          <Box sx={flexCenterStyle}>
            <IconButton onClick={toggleDrawer} size="large">
              <MenuIcon color="action" />
            </IconButton>
          </Box>

          <Typography variant="h4">My Concerts</Typography>

          <Box sx={flexCenterStyle}>
            <Link to="/concerts/new">
              <Tooltip title="Add Concert">
                <IconButton size="large">
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Link to="/concerts">
              <Tooltip title="View Concerts">
                <IconButton size="large">
                  <StadiumIcon />
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
