import type { ButtonProps } from "@mui/material/Button";
import Button from "@mui/material/Button";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

interface NavLinkButtonProps extends ButtonProps {
  to: string;
  children: ReactNode;
}

const NavLinkButton = ({
  to,
  children,
  color = "primary",
  variant = "contained",
  ...rest
}: NavLinkButtonProps) => {
  return (
    <Button component={RouterLink} to={to} color={color} variant={variant} {...rest}>
      {children}
    </Button>
  );
};

export default NavLinkButton;
