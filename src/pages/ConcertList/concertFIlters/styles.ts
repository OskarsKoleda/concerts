import { appTheme } from "../../../components/AppProviders/theme";

import type { SxProps } from "@mui/material";

export const filterContainerStyles: SxProps = {
  margin: "1.5rem 0",
  width: "65%",
};

export const filterSummaryStyles: SxProps = {
  fontWeight: 500,
  margin: 0,
  backgroundColor: appTheme.palette.secondary.main,

  minHeight: "2.5rem",
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
  backgroundColor: "#eee",
};
