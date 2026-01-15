import { Box } from "@mui/material";
import axios from "axios";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

import ErrorBoundaryMessage from "./components/ErrorBoundaryMessage/errorBoundaryMessage.tsx";
import AppRoutes from "./router/AppRoutes.tsx";
import { appContainerStyles, contentWrapperStyles, scrollContainerStyles } from "./styles.ts";
import { useRootStore } from "./store/StoreContext.tsx";

axios.defaults.withCredentials = true;

const App = () => {
  const { setUserProfile } = useRootStore().userStore;

  useEffect(() => {
    const handleUnauthorized = () => {
      setUserProfile(null);
    };

    window.addEventListener("auth-unauthorized", handleUnauthorized);

    return () => window.removeEventListener("auth-unauthorized", handleUnauthorized);
  }, [setUserProfile]);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Box sx={appContainerStyles}>
        <Box sx={contentWrapperStyles}>
          <ErrorBoundary FallbackComponent={ErrorBoundaryMessage}>
            <Box id="scroll-to-container" sx={scrollContainerStyles}>
              <AppRoutes />
            </Box>
          </ErrorBoundary>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
