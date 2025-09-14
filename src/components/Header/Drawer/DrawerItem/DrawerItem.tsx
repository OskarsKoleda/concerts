import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { drawerItemStyles } from "./styles.ts";

import type { ReactNode } from "react";

interface DrawerItemProps {
  to: string;
  label: string;
  isSelected: boolean;
  icon: ReactNode;
}

const DrawerItem = ({ isSelected, label, to, icon }: DrawerItemProps) => {
  return (
    <ListItemButton component={RouterLink} selected={isSelected} to={to} sx={drawerItemStyles}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default DrawerItem;
