import { appTheme } from "../../../components/AppProviders/theme";

import type { SxProps } from "@mui/system";

export const chipStyles: SxProps = {
  fontSize: "1rem",
  marginBottom: "0.1rem",
  marginRight: "0.1rem",
  fontWeight: "600",
  backgroundColor: appTheme.palette.primary.contrastText,
};

export const eventAuthorStyles: SxProps = {
  position: "absolute",
  fontStyle: "italic",
  marginLeft: "0.5rem",
};
