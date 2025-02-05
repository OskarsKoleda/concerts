import HomeIcon from "@mui/icons-material/Home";
import StadiumIcon from "@mui/icons-material/Stadium";
import AddIcon from "@mui/icons-material/Add";
import PortraitIcon from "@mui/icons-material/Portrait";

import { ROUTE_LIST } from "../../router/routes";

export const menuItems = [
  {
    label: "Home",
    path: ROUTE_LIST.HOMEPAGE,
    icon: <HomeIcon />,
  },
  {
    label: "View Concerts",
    path: ROUTE_LIST.EVENTS,
    icon: <StadiumIcon />,
  },
  {
    label: "Add Concert",
    path: ROUTE_LIST.NEW_EVENT,
    icon: <AddIcon />,
  },
  {
    label: "Profile",
    path: "/",
    icon: <PortraitIcon />,
  },
];
