import { Box, Paper, Typography } from "@mui/material";

import { getTopItems, renderListWithCount, renderStatsItem } from "../utils";
import { masonryItemStyles } from "../styles";

const LIMIT = 3;

interface LocationsOverviewProps {
  isLoading: boolean;
  uniqueCitiesSeenCount?: number;
  uniqueVenuesSeenCount?: number;
  citiesSeenCount?: Record<string, number>;
  venuesSeenCount?: Record<string, number>;
}

const LocationsOverview = ({
  isLoading,
  uniqueCitiesSeenCount,
  uniqueVenuesSeenCount,
  citiesSeenCount,
  venuesSeenCount,
}: LocationsOverviewProps) => {
  const topThreeCities = getTopItems(citiesSeenCount, LIMIT);
  const topThreeVenues = getTopItems(venuesSeenCount, LIMIT);

  return (
    <Paper sx={masonryItemStyles}>
      <Typography variant="h6" mb={2}>
        Geography & Venues
      </Typography>
      {renderStatsItem({
        label: "Cities Seen Count:",
        value: uniqueCitiesSeenCount,
        isLoading,
      })}
      {renderStatsItem({
        label: "Venues Seen Count:",
        value: uniqueVenuesSeenCount,
        isLoading,
      })}
      {renderListWithCount(topThreeCities, "Top Three Cities")}
      {renderListWithCount(topThreeVenues, "Top Three Venues")}
    </Paper>
  );
};

export default LocationsOverview;
