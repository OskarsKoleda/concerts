import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import type { ReactNode } from "react";
import { navigationListItemStyles } from "./styles.ts";

interface NavigationListItemProps {
  selected: boolean;
  label: string;
  to: string;
  icon: ReactNode;
}

const NavigationListItem = ({ selected, label, to, icon }: NavigationListItemProps) => {
  return (
    <ListItemButton component={Link} selected={selected} to={to} sx={navigationListItemStyles}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default NavigationListItem;
