import type { ButtonProps } from "@mui/material/Button";
import Button from "@mui/material/Button";
import type { PropsWithChildren } from "react";
import { Link as RouterLink } from "react-router-dom";

type NavLinkButtonProps = {
  to: string;
} & ButtonProps &
  PropsWithChildren;

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
