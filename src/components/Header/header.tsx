import { Typography, AppBar, Toolbar, IconButton, Box, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store/StoreContext";
import { flexCenterStyle, toolbarContainerStyle } from "./styles";

import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import MenuIcon from "@mui/icons-material/Menu";
import PortraitIcon from "@mui/icons-material/Portrait";

export const Header = observer(function Header(): JSX.Element {
  const {
    applicationStore: { toggleDrawer, toggleConcertsView },
  } = useRootStore();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={toolbarContainerStyle}>
          <Box sx={flexCenterStyle}>
            <IconButton onClick={toggleDrawer} size="large">
              <MenuIcon color="action" />
            </IconButton>
          </Box>
          <Typography variant="h4">My Concerts</Typography>
          <Box sx={flexCenterStyle}>
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
