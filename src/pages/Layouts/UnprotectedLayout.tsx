import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header/Header";
import ContentLoader from "../../components/ContentLoader/ContentLoader";

import { layoutContentStyles } from "./styles";

const UnprotectedLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Box width="100%">
      <ContentLoader isLoading={isLoading}>
        <Header isAuthenticated={isAuthenticated} />
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box sx={{ ...layoutContentStyles }}>
            <Outlet />
          </Box>
        </Box>
      </ContentLoader>
    </Box>
  );
};

export default UnprotectedLayout;
