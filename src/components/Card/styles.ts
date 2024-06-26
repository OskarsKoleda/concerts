import type { SxProps } from "@mui/material";

export const posterImageStyle: SxProps = {
  width: "100%",
  display: "block",
  height: "350px",
  objectFit: "cover",
};

export const concertInformationSectionStyle: SxProps = {
  padding: "8px",
};

export const buttonContainerStyle: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};

export const cardStyle: SxProps = {
  transition: "transform 0.3s ease",
  display: "flex",
  flexDirection: "column",
  padding: 1,
  backgroundColor: "rgba(150,150,170)",

  "&:hover": {
    transform: "scale(1.02)",
  },
};
