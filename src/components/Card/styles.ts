import type { SxProps } from "@mui/material";

export const cardStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  // height: '100%',
  maxWidth: "185px",
  padding: 0.5,
  backgroundColor: "rgba(200,210,200)",
  borderRadius: "0",
  transition: "transform 0.3s ease",
  border: "1px solid black",
  "&:hover": {
    transform: "scale(1.02)",
  },
};

export const posterImageStyle: SxProps = {
  width: "100%",
  display: "block",
  height: "200px",
  objectFit: "cover", // Ensure image covers the entire area
};

export const concertInformationSectionStyle: SxProps = {
  padding: "8px",
  flexGrow: 1, // Ensure this section grows to fill available space
};

export const buttonBaseStyle: SxProps = {
  minWidth: 0, // Prevent button from growing too large
  flexShrink: 1, // Allow button to shrink
  display: "flex", // Ensure the icon inside shrinks properly
  alignItems: "center", // Center the icon
};

export const titleStyle: SxProps = {
  maxWidth: "100%", // Limit the maximum width of the text
  whiteSpace: "nowrap", // Prevent text from wrapping
  overflow: "hidden", // Hide overflow text
  textOverflow: "ellipsis", // Add ellipsis for overflow text
};
