import { appTheme } from "../AppProviders/theme.ts";

export const eventCardStyles = {
  display: "flex",
  height: "12rem",
  borderRadius: 0,
  transition: "transform 0.1s ease-out, background-color 0.2s ease-out, filter 0.2s ease-out",

  "&:hover": {
    filter: "brightness(0.9)",
  },

  "& > div:last-child": {
    padding: "0.5rem",
  },
};

export const cardContentStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  borderRadius: 0,
  backgroundColor: appTheme.palette.background.paper,
};

export const cardContentHeaderStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  padding: ".3rem .3rem 0 .3rem",
};

export const cardContentChipStyles = {
  // display: "flex",
  flexWrap: "wrap",
  margin: "0 .3rem",
  height: "100%",
};

export const chipStyles = {
  marginBottom: "0.1rem",
  marginRight: "0.1rem",
  fontWeight: "450",
  backgroundColor: "#B0A1BA",
};

export const cardContentFooterStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 .3rem .3rem .3rem",
};
