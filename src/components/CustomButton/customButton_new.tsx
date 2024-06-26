import Button, { ButtonProps } from "@mui/material/Button";

type CustomButtonProps = ButtonProps & {
  children: React.ReactNode;
};

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default CustomButton;
