import { Box } from "@mui/system";
import { Navigate, Outlet } from "react-router-dom";

import ContentLoader from "../../components/ContentLoader/ContentLoader";
import useAuth from "../../hooks/useAuth";

import AppHeader from "./AppHeader/AppHeader";

const ProtectedLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Box width="100%">
      <ContentLoader isLoading={isLoading}>
        {isAuthenticated ? (
          <>
            <AppHeader />
            <Box display="flex" justifyContent="center">
              <Outlet />
            </Box>
          </>
        ) : (
          <Navigate to="/auth" replace />
        )}
      </ContentLoader>
    </Box>
  );
};

export default ProtectedLayout;
