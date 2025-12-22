import { Box } from "@mui/material";
import axios from "axios";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

import ErrorBoundaryMessage from "./components/ErrorBoundaryMessage/errorBoundaryMessage.tsx";
import AppRoutes from "./router/AppRoutes.tsx";
import { appContainerStyles, contentWrapperStyles, scrollContainerStyles } from "./styles.ts";

axios.defaults.withCredentials = true;

const App = () => (
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

export default App;
