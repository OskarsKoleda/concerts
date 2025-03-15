import { appTheme } from "../AppProviders/theme.ts";

export const eventRowContainerStyles = (imageUrl?: string) => {
  return {
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    color: appTheme.palette.primary.contrastText,
    textShadow: "5px 5px 10px rgba(0, 0, 0, 1)",
    letterSpacing: "0.15rem",
    opacity: "0.7",
    padding: "0.5rem",
    backgroundImage: imageUrl ? `url(${imageUrl})` : appTheme.palette.primary.light,
    backgroundSize: "cover",
    backgroundPosition: "center",

    transition: "all .2s ease-in-out",

    ":hover": {
      transform: "scale(1.02)",
      letterSpacing: "0.5rem",
      opacity: "1",
    },
  };
};
