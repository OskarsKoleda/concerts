import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import StadiumIcon from "@mui/icons-material/Stadium";
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Skeleton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link as RouterLink } from "react-router-dom";

import { horizontallyCenteredStyles } from "../../common/styles.ts";
import { ROUTES } from "../../router/routes.ts";
import { useRootStore } from "../../store/StoreContext.tsx";

import Drawer from "./Drawer/Drawer.tsx";
import { appTitleStyles, headerSkeletonStyles, headerToolbarStyles } from "./styles";
import UserActions from "./UserActions/UserActions.tsx";

const Header = () => {
  const {
    userStore: { userProfile, isAuthLoading },
  } = useRootStore();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={headerToolbarStyles}>
          <Box sx={horizontallyCenteredStyles}>
            <Drawer />

            <Link component={RouterLink} sx={horizontallyCenteredStyles} to={ROUTES.HOMEPAGE}>
              <HomeIcon color="action" fontSize="large" />
              <Typography variant="h3" sx={appTitleStyles}>
                Event Tracker
              </Typography>
            </Link>
          </Box>

          <Box sx={horizontallyCenteredStyles}>
            {isAuthLoading ? (
              <Skeleton animation="wave" variant="rectangular" sx={headerSkeletonStyles} />
            ) : (
              <>
                <Link component={RouterLink} to={ROUTES.EVENTS}>
                  <Tooltip title="View Event">
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

                {userProfile && <UserActions />}
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default observer(Header);
