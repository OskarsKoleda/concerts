import type { SxProps } from "@mui/material";

export const cardStyle: SxProps = {
  transition: "transform 0.3s ease",
  // height: '250px',
  display: "flex",
  flexDirection: "column",
  padding: 1,
  backgroundColor: "rgba(150,150,170)",

  "&:hover": {
    transform: "scale(1.02)",
  },
};

export const posterImageStyle: SxProps = {
  width: "100%",
  display: "block",
  height: "200px",
  // objectFit: "cover",
};

export const concertInformationSectionStyle: SxProps = {
  padding: "8px",
};

export const buttonContainerStyle: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};
