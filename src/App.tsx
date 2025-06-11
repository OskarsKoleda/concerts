import { Box } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";
import React from "react";
import Header from "./components/Header/Header.tsx";

import { ErrorBoundaryMessage } from "./components/ErrorBoundaryMessage/errorBoundaryMessage.tsx";
import { ErrorToast } from "./components/ErrorToast/errorToast.tsx";
import { appContainerStyles, contentWrapperStyles, scrollContainerStyles } from "./styles.ts";
import AppRoutes from "./router/routes.tsx";

const App: React.FC = () => (
  <BrowserRouter future={{ v7_startTransition: true }}>
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
