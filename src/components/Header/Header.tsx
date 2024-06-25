import { Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store/StoreContext";

const Header: React.FC = () => {
  const { applicationStore } = useStore();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={() => applicationStore.toggleDrawer()} size="small">
          <MenuOpenIcon />
        </IconButton>
        <Typography variant="h6">MY CONCERTS</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default observer(Header);
