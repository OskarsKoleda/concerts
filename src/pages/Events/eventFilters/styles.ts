import type { SxProps } from "@mui/material";

export const filterContainerStyles: SxProps = {
  margin: "2rem 0",
};

export const filterSummaryStyles: SxProps = {
  borderRadius: "0",
  // backgroundColor: "secondary.dark",

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
  backgroundColor: "background.paper",
};
