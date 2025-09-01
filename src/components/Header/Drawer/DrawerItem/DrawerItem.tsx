import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { drawerItemStyles } from "./styles.ts";

import type { ReactNode } from "react";

interface DrawerItemProps {
  selected: boolean;
  label: string;
  to: string;
  icon: ReactNode;
}

const DrawerItem = ({ selected, label, to, icon }: DrawerItemProps) => {
  return (
    <ListItemButton component={RouterLink} selected={selected} to={to} sx={drawerItemStyles}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default DrawerItem;
