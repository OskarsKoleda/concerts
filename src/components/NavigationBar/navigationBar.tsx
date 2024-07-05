import { Drawer, List, Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store/StoreContext";
import NavListItem from "../NavigationListItem/navigationListItem";
import { ROUTE_LIST } from "../../router/routes";

export const NavigationBar: React.FC = observer(() => {
  const {
    applicationStore: { drawerIsOpen, toggleDrawer },
  } = useRootStore();

  return (
    <Drawer variant="temporary" onClose={toggleDrawer} open={drawerIsOpen} anchor="left">
      <Box sx={{ width: 150 }} onClick={toggleDrawer}>
        <List>
          <NavListItem path={ROUTE_LIST.HOMEPAGE} label="Home" />
          <NavListItem path={`/${ROUTE_LIST.CONCERTS}`} label="Concerts" />
          <NavListItem path={`/${ROUTE_LIST.NEW_CONCERT}`} label="Add Concert" />
        </List>
      </Box>
    </Drawer>
  );
});
