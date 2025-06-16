import type { SxProps } from "@mui/material";

import { appTheme } from "../../../components/AppProviders/theme.ts";

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
  backgroundColor: appTheme.palette.background.default,
};
