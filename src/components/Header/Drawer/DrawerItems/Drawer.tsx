import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import DrawerItems from "./DrawerItems.tsx";

const Drawer = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleShowDrawer = () => {
    setShowDrawer((prev) => !prev);
  };

  return (
    <>
      <DrawerItems showDrawer={showDrawer} toggleDrawer={toggleShowDrawer} />
      <IconButton onClick={toggleShowDrawer} size="large">
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default Drawer;
