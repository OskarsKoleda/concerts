import type { SxProps, Theme } from "@mui/material";

// export const contentWrapperStyles: SxProps<Theme> = {
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "flex-start",
//   // alignItems: "baseline",
//   // marginTop: "5rem",
//   flexGrow: "100",
//   transition: "all 100ms ease-in-out 100ms",
//   transformOrigin: "50% 0",
// };

export const appContainerStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  height: "100vh", // Ensure the container takes full viewport height
  width: "100vw",
  // background: (theme) => theme.palette.primary.light,
  backgroundColor: "#DDD",
};

export const contentWrapperStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  flexGrow: "1",
  height: "100%", // Make sure the height takes the full space
  backgroundColor: "#abcdef",
};

export const scrollContainerStyles: SxProps<Theme> = {
  flexGrow: "1",
  overflowY: "auto", // Enable scrolling here
  // overflowX: "hidden",
  // paddingTop: "10px", // Add a bit of spacing to prevent pushing the header
  height: "100%", // Make sure the height takes the full space
  // width: "100%",
  backgroundColor: "#eda223",
};
