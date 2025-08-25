import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import PortraitIcon from "@mui/icons-material/Portrait";
import StadiumIcon from "@mui/icons-material/Stadium";

import { ROUTES } from "../../../../router/routes.ts";
import type { DrawerItem } from "../types.ts";

export const drawerItems: DrawerItem[] = [
  {
    label: "Homepage",
    path: ROUTES.HOMEPAGE,
    icon: <HomeIcon />,
  },
  {
    label: "View Events",
    path: ROUTES.EVENTS,
    icon: <StadiumIcon />,
  },
  {
    label: "Add Event",
    path: ROUTES.NEW_EVENT,
    icon: <AddIcon />,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <PortraitIcon />,
  },
];
