import { Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store/StoreContext";

export const Header = observer(function Header(): JSX.Element {
  const {
    applicationStore: { toggleDrawer, toggleConcertsView },
  } = useRootStore();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={toggleDrawer} size="large">
          <MenuOpenIcon />
        </IconButton>
        <Typography variant="h6">MY CONCERTS</Typography>
        <IconButton onClick={toggleConcertsView} size="large">
          <RemoveRedEye />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
});
