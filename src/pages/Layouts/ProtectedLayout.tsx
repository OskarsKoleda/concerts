import { Box } from "@mui/system";
import { Navigate, Outlet } from "react-router-dom";

import ContentLoader from "../../components/ContentLoader/ContentLoader";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header/Header";
import { ROUTES } from "../../router/routes";

import { layoutContentStyles } from "./styles";

const ProtectedLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Box width="100%">
      <ContentLoader isLoading={isLoading}>
        {isAuthenticated ? (
          <>
            <Header isAuthenticated={isAuthenticated} />
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box sx={layoutContentStyles}>
                <Outlet />
              </Box>
            </Box>
          </>
        ) : (
          <Navigate to={ROUTES.AUTH} replace />
        )}
      </ContentLoader>
    </Box>
  );
};

export default ProtectedLayout;
