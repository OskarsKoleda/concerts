import type { SxProps } from "@mui/material";
import { appTheme } from "../../../components/AppProviders/theme";

export const filterContainerStyles: SxProps = {
  margin: "1.5rem 0",
};

export const filterSummaryStyles: SxProps = {
  fontWeight: 500,
  margin: 0,
  backgroundColor: appTheme.palette.secondary.light,

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
  backgroundColor: "#f5f1f1",
};
