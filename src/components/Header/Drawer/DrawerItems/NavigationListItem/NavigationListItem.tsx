import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { navigationListItemStyles } from "./styles.ts";

import type { ReactNode } from "react";

interface NavigationListItemProps {
  selected: boolean;
  label: string;
  to: string;
  icon: ReactNode;
}

const NavigationListItem = ({ selected, label, to, icon }: NavigationListItemProps) => {
  return (
    <ListItemButton
      component={RouterLink}
      selected={selected}
      to={to}
      sx={navigationListItemStyles}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default NavigationListItem;
