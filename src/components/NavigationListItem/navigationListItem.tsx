import { Link } from "react-router-dom";
import { ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import { listItemStyle } from "./styles";

interface ListItemLinkProps {
  selected: boolean;
  icon?: React.ReactElement;
  label: string;
  to: string;
  onClick: () => void;
}

export const NavListItem: React.FC<ListItemLinkProps> = ({
  icon,
  label,
  to,
  selected,
  onClick,
}: ListItemLinkProps) => {
  return (
    <li>
      <ListItemButton
        component={Link}
        selected={selected}
        to={to}
        onClick={onClick}
        sx={listItemStyle}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={label} />
      </ListItemButton>
    </li>
  );
};
