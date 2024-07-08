import { SxProps } from "@mui/material";

export const formContainerStyle: SxProps = {
  marginTop: 2,
};

export const buttonsContainerStyle: SxProps = {
  display: "flex",
  justifyContent: "flex-end",
  mt: 2,
  "& > button:not(:first-of-type)": {
    ml: 1,
  },
};
