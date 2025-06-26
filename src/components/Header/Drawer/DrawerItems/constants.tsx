import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import PortraitIcon from "@mui/icons-material/Portrait";
import StadiumIcon from "@mui/icons-material/Stadium";

import { ROUTE_LIST } from "../../../../router/routes.ts";
import type { DrawerItem } from "../types.ts";

export const drawerItems: DrawerItem[] = [
  {
    label: "Home",
    path: ROUTE_LIST.HOMEPAGE,
    icon: <HomeIcon />,
  },
  {
    label: "View Events",
    path: ROUTE_LIST.EVENTS,
    icon: <StadiumIcon />,
  },
  {
    label: "Add Event",
    path: ROUTE_LIST.NEW_EVENT,
    icon: <AddIcon />,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <PortraitIcon />,
  },
];
