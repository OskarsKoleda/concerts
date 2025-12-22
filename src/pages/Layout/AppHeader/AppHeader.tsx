import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import StadiumIcon from "@mui/icons-material/Stadium";
import { IconButton, Link, Tooltip, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import Drawer from "../../../components/Header/Drawer/Drawer";
import Header from "../../../components/Header/Header";
import UserActions from "../../../components/Header/UserActions/UserActions";
import { ROUTES } from "../../../router/routes";

import { leftContentStyles } from "./styles";

const AppHeader = () => {
  const leftContent = (
    <>
      <Drawer />
      <Link component={RouterLink} to={ROUTES.HOMEPAGE} sx={leftContentStyles}>
        <HomeIcon fontSize="large" />
        <Typography variant="h3">Event Tracker</Typography>
      </Link>
    </>
  );

  const rightContent = (
    <>
      <Link component={RouterLink} to={ROUTES.EVENTS}>
        <Tooltip title="View Events">
          <IconButton size="large">
            <StadiumIcon />
          </IconButton>
        </Tooltip>
      </Link>

      <Link component={RouterLink} to={ROUTES.NEW_EVENT}>
        <Tooltip title="Add Event">
          <IconButton size="large">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Link>

      <UserActions />
    </>
  );

  return <Header leftContent={leftContent} rightContent={rightContent} />;
};

export default AppHeader;
