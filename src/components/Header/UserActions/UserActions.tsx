import LogoutIcon from "@mui/icons-material/Logout";
import PortraitIcon from "@mui/icons-material/Portrait";
import { Divider, IconButton, Link, Tooltip, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import { useLogout } from "../../../api/auth/useLogout.ts";
import { AuthMode } from "../../../pages/Auth/constants.ts";
import { ROUTES } from "../../../router/routes.ts";
import { useRootStore } from "../../../store/StoreContext.tsx";

import { dividerStyles } from "./styles.ts";

const UserActions = () => {
  const {
    userStore: { userProfile, setUserProfile },
  } = useRootStore();

  const navigation = useNavigate();
  const { mutate: logout } = useLogout();
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setUserProfile(null);
        navigation(`${ROUTES.AUTH}/?mode=${AuthMode.Login}`);
      },
    });
  };

  return (
    <>
      <Divider orientation="vertical" sx={dividerStyles} />
      <Typography variant="body1">{userProfile?.name}</Typography>
      <Link component={RouterLink} to={ROUTES.HOMEPAGE}>
        <Tooltip title="Profile">
          <IconButton size="large">
            <PortraitIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Divider orientation="vertical" sx={dividerStyles} />
      <Tooltip title="Logout">
        <IconButton onClick={handleLogout} size="large">
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default observer(UserActions);
