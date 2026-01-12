import { Paper, Box, Typography } from "@mui/material";

import { masonryItemStyles } from "../styles";
import { renderStatsItem, getTopItems, renderListWithCount } from "../utils";

const LIMIT = 5;

interface BandsOverviewProps {
  isLoading: boolean;
  uniqueBandsSeenCount?: number;
  bandCounts?: Record<string, number>;
}

const BandsOverview = ({ isLoading, uniqueBandsSeenCount, bandCounts }: BandsOverviewProps) => {
  const topFiveOccurrences = getTopItems(bandCounts, LIMIT);

  return (
    <Paper sx={masonryItemStyles}>
      {renderStatsItem({
        label: "Unique Bands Seen Count:",
        value: uniqueBandsSeenCount,
        isLoading,
      })}

      {renderListWithCount(topFiveOccurrences, "Top Five Bands")}
    </Paper>
  );
};

export default BandsOverview;
