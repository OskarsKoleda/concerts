import LogoutIcon from "@mui/icons-material/Logout";
import PortraitIcon from "@mui/icons-material/Portrait";
import { Divider, IconButton, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ROUTE_LIST } from "../../../router/routes.ts";
import { useRootStore } from "../../../store/StoreContext.tsx";
import { dividerStyles } from "./styles.ts";

const UserActions = () => {
  const {
    userStore: { logoutUser, userProfile },
  } = useRootStore();

  const navigation = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigation(`${ROUTE_LIST.AUTH}/?mode=login`);
  };

  return (
    <>
      <Divider orientation="vertical" sx={dividerStyles} />
      <Typography variant="body1">{userProfile?.username}</Typography>
      <IconButton size="large">
        <PortraitIcon />
      </IconButton>
      <Divider orientation="vertical" sx={dividerStyles} />
      <IconButton onClick={handleLogout} size="large">
        <LogoutIcon />
      </IconButton>
    </>
  );
};

export default observer(UserActions);
