import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import React from "react";
import { listItemStyle } from "./styles.ts";

interface ListItemLinkProps {
  selected: boolean;
  label: string;
  to: string;
  icon?: React.ReactElement;
}

export const NavListItem: React.FC<ListItemLinkProps> = ({
  selected,
  label,
  to,
  icon,
}: ListItemLinkProps) => {
  return (
    <ListItemButton component={Link} selected={selected} to={to} sx={listItemStyle}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={label} />
    </ListItemButton>
  );
};
