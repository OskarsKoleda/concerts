import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import type { ReactNode } from "react";

interface NavLinkButtonProps extends ButtonProps {
  to: string;
  children: ReactNode;
}

export const NavLinkButton: React.FC<NavLinkButtonProps> = ({
  to,
  children,
  color = "primary",
  variant = "contained",
  ...rest
}) => {
  return (
    <Button component={RouterLink} to={to} color={color} variant={variant} {...rest}>
      {children}
    </Button>
  );
};
