import { Box, Divider, Drawer, List } from "@mui/material";
import { observer } from "mobx-react-lite";

import { useRootStore } from "../../store/StoreContext";
import { NavListItem } from "../NavigationListItem/navigationListItem";

import { menuItems } from "./constants";

export const DrawerNavigation: React.FC = observer(() => {
  const {
    applicationStore: {
      drawerIsOpen,
      toggleDrawer,
      setActiveMenuItem: selectMenuItem,
      currentMenuItem,
    },
  } = useRootStore();

  const handleListItemClick = (itemLabel: string) => {
    selectMenuItem(itemLabel);
  };

  return (
    <Drawer variant="temporary" onClose={toggleDrawer} open={drawerIsOpen} anchor="left">
      <Box width={210} onClick={toggleDrawer}>
        <List>
          {menuItems.map((item) => {
            return (
              <NavListItem
                key={item.label}
                selected={currentMenuItem === item.label}
                onClick={() => handleListItemClick(item.label)}
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
