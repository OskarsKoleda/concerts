import LogoutIcon from "@mui/icons-material/Logout";
import PortraitIcon from "@mui/icons-material/Portrait";
import { Divider, IconButton, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { AuthMode } from "../../../pages/Auth/constants.ts";
import { ROUTES } from "../../../router/routes.ts";

import { dividerStyles } from "./styles.ts";

// TODO: update needed
const UserActions = () => {
  const navigation = useNavigate();
  const redirectToLogin = () => navigation(`${ROUTES.AUTH}/?mode=${AuthMode.login}`);

  return (
    <>
      <Divider orientation="vertical" sx={dividerStyles} />
      <Typography variant="body1">Rogopop</Typography>
      <IconButton size="large">
        <PortraitIcon />
      </IconButton>
      <Divider orientation="vertical" sx={dividerStyles} />
      <IconButton onClick={() => {}} size="large">
        <LogoutIcon />
      </IconButton>
    </>
  );
};

export default observer(UserActions);
