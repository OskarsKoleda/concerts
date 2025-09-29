import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import StadiumIcon from "@mui/icons-material/Stadium";
import { IconButton, Link, Tooltip, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { horizontallyCenteredStyles } from "../../../common/styles";
import Drawer from "../../../components/Header/Drawer/Drawer";
import Header from "../../../components/Header/Header";
import UserActions from "../../../components/Header/UserActions/UserActions";
import { ROUTES } from "../../../router/routes";

import { appTitleStyles } from "./styles";

const AppHeader = () => {
  const leftContent = (
    <>
      <Drawer />
      <Link component={RouterLink} sx={horizontallyCenteredStyles} to={ROUTES.HOMEPAGE}>
        <HomeIcon color="action" fontSize="large" />
        <Typography variant="h3" sx={appTitleStyles}>
          Event Tracker
        </Typography>
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
