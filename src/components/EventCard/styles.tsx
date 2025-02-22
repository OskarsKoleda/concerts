export const cardStyles = {
  display: "flex",
  height: "200px",
  padding: ".3rem",
  backgroundColor: "#918989",
  transition: "transform 0.1s ease-out, background-color 0.2s ease-out, filter 0.2s ease-out",

  "&:hover": {
    transform: "scale(1.01)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    filter: "brightness(1.1)",
  },

  "& > div:last-child": {
    padding: "0",
  },
};

export const cardImageStyles = {
  flexShrink: 0,
  marginRight: ".5rem",
  width: "30%",
  height: "100%",
  borderRadius: "5px",
};

export const cardContentStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  borderRadius: "5px",
  backgroundColor: "#e8f4e8",
};

export const cardContentHeaderStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  padding: ".3rem .3rem 0 .3rem",
};

export const cardContentChipStyles = {
  display: "flex",
  flexWrap: "wrap",
  margin: "0 .3rem",
  height: "100%",
};

export const chipStyles = {
  marginBottom: "0.15rem",
  marginRight: "0.15rem",
};

export const cardContentFooterStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 .3rem .3rem .3rem",
};
