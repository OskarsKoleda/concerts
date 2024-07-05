import { Grid } from "@mui/material";
import { ReactNode } from "react";
import { headerStyles } from "./styles";

export interface DataGridHeaderProps {
  summaryContent: ReactNode;
  filtersContent: ReactNode;
}

export const DataGridHeader: React.FC<DataGridHeaderProps> = ({
  summaryContent,
  filtersContent,
}) => {
  return (
    <Grid container sx={headerStyles}>
      <Grid item>{summaryContent}</Grid>
      <Grid item>{filtersContent}</Grid>
    </Grid>
  );
};
