import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

import type { ButtonProps } from "@mui/material/Button";
import type { PropsWithChildren } from "react";

type NavLinkButtonProps = {
  to: string;
} & ButtonProps &
  PropsWithChildren;

const NavLinkButton = ({
  to,
  color = "primary",
  variant = "contained",
  children,
  ...rest
}: NavLinkButtonProps) => {
  return (
    <Button component={RouterLink} to={to} color={color} variant={variant} {...rest}>
      {children}
    </Button>
  );
};

export default NavLinkButton;
