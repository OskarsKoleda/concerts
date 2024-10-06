import { Drawer, List, Box, Divider } from "@mui/material";
import { observer } from "mobx-react-lite";

import { useRootStore } from "../../store/StoreContext";
import { NavListItem } from "../NavigationListItem/navigationListItem";

import { menuItems } from "./constants";

export const DrawerNavigation: React.FC = observer(() => {
  const {
    applicationStore: { drawerIsOpen, toggleDrawer, selectMenuItem, whatIsSelectedMenuItem },
  } = useRootStore();

  const handleListItemClick = (index: number) => {
    selectMenuItem(index);
  };

  return (
    <Drawer variant="temporary" onClose={toggleDrawer} open={drawerIsOpen} anchor="left">
      <Box width={210} onClick={toggleDrawer}>
        <List>
          {menuItems.map((item, index) => {
            return (
              <NavListItem
                key={index}
                selected={whatIsSelectedMenuItem === index}
                onClick={() => handleListItemClick(index)}
                to={item.path}
                label={item.label}
                icon={item.icon}
              />
            );
          })}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
});
