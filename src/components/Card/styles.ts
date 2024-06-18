import type { SxProps } from "@mui/material";

export const posterImageStyle: SxProps = {
  width: "100%",
  display: "block",
  maxHeight: "250px",
  objectFit: "cover",
};

export const concertInformationSectionStyle: SxProps = {
  padding: "12px",
};

export const cardStyle: SxProps = {
  transition: "transform 0.3s ease",

  "&:hover": {
    transform: "scale(1.05)",
  },
};
