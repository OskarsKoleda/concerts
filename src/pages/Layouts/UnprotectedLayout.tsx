import { Box } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import { layoutContentStyles } from "./styles";

const UnprotectedLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Box width="100%">
      <ContentLoader isLoading={isLoading}>
        <Header isAuthenticated={isAuthenticated} />
        <Box sx={layoutContentStyles}>
          <Outlet />
        </Box>
      </ContentLoader>
    </Box>
  );
};

export default UnprotectedLayout;
