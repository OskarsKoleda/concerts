import { NavLink } from "react-router-dom";
import { ListItem, ListItemText, ListItemButton } from "@mui/material";
import "./NavigationListItem.css";

interface NavListItemProps {
  label: string;
  path: string;
}

const NavListItem: React.FC<NavListItemProps> = ({ label, path }: NavListItemProps) => {
  return (
    <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "inactive")}>
      <ListItemButton>
        <ListItem disablePadding>
          <ListItemText primary={label} />
        </ListItem>
      </ListItemButton>
    </NavLink>
  );
};

export default NavListItem;
