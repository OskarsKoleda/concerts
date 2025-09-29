import { AppBar, Box, Toolbar } from "@mui/material";

import { horizontallyCenteredStyles } from "../../common/styles.ts";

import { headerToolbarStyles } from "./styles";

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
          <Box sx={horizontallyCenteredStyles}>{leftContent}</Box>
          <Box sx={horizontallyCenteredStyles}>{rightContent}</Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
