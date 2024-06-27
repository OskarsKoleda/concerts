import { Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store/StoreContext";

export const Header = observer(function Header(): JSX.Element {
  const { applicationStore } = useRootStore();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={() => applicationStore.toggleDrawer()} size="large">
          <MenuOpenIcon />
        </IconButton>
        <Typography variant="h6">MY CONCERTS</Typography>
      </Toolbar>
    </AppBar>
  );
});
