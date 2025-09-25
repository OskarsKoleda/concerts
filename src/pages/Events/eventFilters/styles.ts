import { appTheme } from "../../../components/AppProviders/theme.ts";

import type { SxProps } from "@mui/material";

export const filterContainerStyles: SxProps = {
  margin: "1.5rem 0 0.5rem 0",
};

export const filterSummaryStyles: SxProps = {
  borderRadius: "0",
  backgroundColor: appTheme.palette.secondary.light,

  "&.Mui-expanded": {
    minHeight: "3rem",
  },

  ".MuiAccordionSummary-content": {
    "&.Mui-expanded": {
      margin: "0",
    },
  },
};

export const filterDetailsStyles: SxProps = {
  padding: "1rem",
  backgroundColor: appTheme.palette.background.default,
};
