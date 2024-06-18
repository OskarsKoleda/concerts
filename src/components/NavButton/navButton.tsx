// NavLinkButton.tsx

import React, { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button, { ButtonProps } from "@mui/material/Button";

interface NavLinkButtonProps extends ButtonProps {
  to: string;
  children: ReactNode;
}

const NavLinkButton: React.FC<NavLinkButtonProps> = ({
  to,
  children,
  color = "primary",
  variant = "contained",
  ...rest
}) => {
  return (
    <Button 
    component={RouterLink} 
    to={to} 
    color={color} 
    variant={variant} 
    {...rest}>
      {children}
    </Button>
  );
};

export default NavLinkButton;
