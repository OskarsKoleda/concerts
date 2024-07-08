import { ROUTE_LIST } from "../../router/routes";
import HomeIcon from "@mui/icons-material/Home";
import StadiumIcon from "@mui/icons-material/Stadium";
import AddIcon from "@mui/icons-material/Add";

export const menuItems = [
  {
    label: "Home",
    path: ROUTE_LIST.HOMEPAGE,
    icon: <HomeIcon />,
  },
  {
    label: "View Concerts",
    path: ROUTE_LIST.CONCERTS,
    icon: <StadiumIcon />,
  },
  {
    label: "Add Concert",
    path: ROUTE_LIST.NEW_CONCERT,
    icon: <AddIcon />,
  },
];
