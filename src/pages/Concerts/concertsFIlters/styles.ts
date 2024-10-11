import { appTheme } from "../../../components/AppProviders/theme";

import type { SxProps } from "@mui/material";

export const filterContainerStyles: SxProps = {
  margin: "1rem 0",
  width: "65%",
};

export const filterSummaryStyles: SxProps = {
  fontWeight: 500,
  backgroundColor: appTheme.palette.secondary.main,
};

export const filterDetailsStyles: SxProps = {
  backgroundColor: "#eee",
};
