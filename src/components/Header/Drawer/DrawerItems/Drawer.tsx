import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { drawerItems } from "./constants.tsx";
import DrawerItems from "./DrawerItems/DrawerItems.tsx";

const Drawer = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleShowDrawer = () => {
    setShowDrawer((prev) => !prev);
  };

  return (
    <>
      <DrawerItems
        drawerItems={drawerItems}
        showDrawer={showDrawer}
        toggleDrawer={toggleShowDrawer}
      />
      <IconButton onClick={toggleShowDrawer} size="large">
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default Drawer;
