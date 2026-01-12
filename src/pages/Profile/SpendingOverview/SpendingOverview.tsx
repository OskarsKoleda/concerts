import { Typography, Paper } from "@mui/material";

import { renderStatsItem } from "../utils";
import { masonryItemStyles } from "../styles";

interface SpendingOverviewProps {
  isLoading: boolean;
  maxSpent?: number;
  minSpent?: number;
  avgSpent?: number;
  totalSpent?: number;
}

const SpendingOverview = ({
  isLoading,
  maxSpent,
  minSpent,
  avgSpent,
  totalSpent,
}: SpendingOverviewProps) => {
  return (
    <Paper sx={masonryItemStyles}>
      <Typography variant="h6" mb={2}>
        Spending Overview
      </Typography>
      {renderStatsItem({ label: "Max Spent:", value: maxSpent, suffix: " €", isLoading })}
      {renderStatsItem({ label: "Min Spent:", value: minSpent, suffix: " €", isLoading })}
      {renderStatsItem({ label: "Avg Spent:", value: avgSpent, suffix: " €", isLoading })}
      {renderStatsItem({ label: "Total Spent:", value: totalSpent, suffix: " €", isLoading })}
    </Paper>
  );
};

export default SpendingOverview;
