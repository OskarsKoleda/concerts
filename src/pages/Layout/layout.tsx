import { Outlet } from "react-router-dom";
import React from "react";
import { Box } from "@mui/material";

export const Layout: React.FC = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Outlet />
    </Box>
  );
};

export default Layout;
