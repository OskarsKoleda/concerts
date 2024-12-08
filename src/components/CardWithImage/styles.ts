import type { SxProps } from "@mui/material";

export const cardContainerStyle: SxProps = {
  // perspective: "1000px",
  width: "10rem",
  height: "15rem",
  backgroundColor: "#CCC",

  "&:hover": {
    cursor: "pointer",
  },
};

export const cardContentStyle: SxProps = {
  height: "100%",
  // transition: "transform 0.1s ease-out",
  transformStyle: "preserve-3d",
  "&:hover": {
    transform: "rotateY(180deg)",
  },
};

export const cardFrontStyle: SxProps = {
  position: "absolute",
  height: "100%",
  backfaceVisibility: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2, // Ensure front is visible initially
};

export const imageStyle: SxProps = {
  height: "100%",
  width: "100%",
  objectFit: "cover", // Ensure image covers the entire card front
};

export const cardBackStyle: SxProps = {
  // position: "absolute",
  // width: "100%",
  height: "100%",
  backgroundColor: "rgba(240, 230, 230)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: ".5rem",
  backfaceVisibility: "hidden",
  transform: "rotateY(180deg)", // Hide the back initially
};

export const cardTitleStyle: SxProps = {
  margin: 0,
  textAlign: "center",
  maxWidth: "100%", // Limit the maximum width of the text
  overflow: "hidden", // Hide overflow text
  textOverflow: "ellipsis", // Add ellipsis for overflow text
};
