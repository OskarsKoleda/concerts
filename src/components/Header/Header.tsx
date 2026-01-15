import { AppBar, Box, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import StadiumIcon from "@mui/icons-material/Stadium";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link as RouterLink } from "react-router-dom";
import { IconButton, Link, Tooltip, Typography } from "@mui/material";

import { ROUTES } from "../../router/routes";

import { headerToolbarStyles, headerContentStyles, navLinkStyles } from "./styles";
import Drawer from "./Drawer/Drawer";
import UserActions from "./UserActions/UserActions";

import type { HeaderContent } from "./types";

interface HeaderProps {
  isAuthenticated: boolean;
}

const Header = ({ isAuthenticated }: HeaderProps) => {
  const right: HeaderContent[] = [
    {
      icon: <StadiumIcon />,
      tooltip: "View Events",
      link: ROUTES.EVENTS,
      disabled: false,
    },
    {
      icon: <AddIcon />,
      tooltip: "Add Event",
      link: ROUTES.NEW_EVENT,
      disabled: !isAuthenticated,
    },
  ];

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={headerToolbarStyles}>
          <Box sx={headerContentStyles}>
            {isAuthenticated && <Drawer />}

            <Link key="home" component={RouterLink} to={ROUTES.HOMEPAGE} sx={navLinkStyles}>
              <HomeIcon fontSize="large" />
              <Typography variant="h3">Event Tracker</Typography>
            </Link>
          </Box>

          <Box sx={headerContentStyles}>
            {right
              .filter((item) => !item.disabled)
              .map((item) => (
                <Link key={item.tooltip} component={RouterLink} to={item.link}>
                  <Tooltip title={item.tooltip}>
                    <IconButton size="large">{item.icon}</IconButton>
                  </Tooltip>
                </Link>
              ))}

            {isAuthenticated ? (
              <UserActions />
            ) : (
              <Link component={RouterLink} to={ROUTES.AUTH} sx={navLinkStyles}>
                <PersonAddIcon />
                <Typography variant="body1">Log In</Typography>
              </Link>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
