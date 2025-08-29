import { Box } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

import ErrorBoundaryMessage from "./components/ErrorBoundaryMessage/ErrorBoundaryMessage.tsx";
import Header from "./components/Header/Header.tsx";
import AppRoutes from "./router/AppRoutes.tsx";
import { appContainerStyles, contentWrapperStyles, scrollContainerStyles } from "./styles.ts";

const App = () => (
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
  </BrowserRouter>
);

export default App;
