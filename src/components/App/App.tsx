import { Box } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "../../router/routes.tsx";
import { DrawerNavigation } from "../DrawerNavigation/drawerNavigation.tsx";
import { Header } from "../Header/header.tsx";

import { appContainerStyles, contentWrapperStyles, scrollContainerStyles } from "./styles.ts";

const App: React.FC = () => (
  <BrowserRouter>
    <DrawerNavigation />

    <Box sx={appContainerStyles}>
      <Box sx={contentWrapperStyles}>
        <Header />
        <Box id="scroll-to-container" sx={scrollContainerStyles}>
          <AppRoutes />
        </Box>
      </Box>
    </Box>
  </BrowserRouter>
);

export default App;
