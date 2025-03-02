import { Box } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";
import React from "react";
import AppRoutes from "../../router/routes.tsx";
import { DrawerNavigation } from "../DrawerNavigation/drawerNavigation.tsx";
import { Header } from "../Header/header.tsx";

import { ErrorBoundaryMessage } from "../ErrorBoundaryMessage/errorBoundaryMessage.tsx";
import { ErrorToast } from "../ErrorToast/errorToast.tsx";
import { appContainerStyles, contentWrapperStyles, scrollContainerStyles } from "./styles.ts";

const App: React.FC = () => (
  <BrowserRouter future={{ v7_startTransition: true }}>
    <DrawerNavigation />

    <Box sx={appContainerStyles}>
      <Box sx={contentWrapperStyles}>
        <Header />
        <ErrorBoundary FallbackComponent={ErrorBoundaryMessage}>
          <Box id="scroll-to-container" sx={scrollContainerStyles}>
            <AppRoutes />
          </Box>
        </ErrorBoundary>
      </Box>
    </Box>
    <ErrorToast />
  </BrowserRouter>
);

export default App;
