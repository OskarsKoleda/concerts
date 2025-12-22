import { AppBar, Box, Toolbar } from "@mui/material";

import { headerToolbarStyles, headerContentStyles } from "./styles";

import type { ReactNode } from "react";

interface HeaderProps {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

const Header = ({ leftContent, rightContent }: HeaderProps) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={headerToolbarStyles}>
          <Box sx={headerContentStyles}>{leftContent}</Box>
          <Box sx={headerContentStyles}>{rightContent}</Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
