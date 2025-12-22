import type { SxProps } from "@mui/material";

export const cardStyles: SxProps = {
  display: "flex",
  height: "16rem",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  "&:hover": {
    transform: "scale(0.98)",
  },
};

export const cardRightSideStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  padding: "1.25rem",
  width: "70%",
};

export const cardContentStyles: SxProps = {
  padding: 0,
};

export const cardActionsStyles: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 0,
  marginTop: "auto",
};

export const cardImageStyles: SxProps = {
  width: "30%",
  objectFit: "cover",
};
