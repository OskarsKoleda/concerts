import { Box, Typography } from "@mui/material";
import { Masonry } from "@mui/lab";

import { useGetUserStats } from "../../api/user/useGetUserStats";

import EventsOverview from "./EventOverview/EventsOverview";
import SpendingOverview from "./SpendingOverview/SpendingOverview";
import BandsOverview from "./BandsOverview/BandsOverview";
import LocationsOverview from "./LocationsOverview/LocationsOverview";

const Profile = () => {
  const { data, isLoading } = useGetUserStats();

  const {
    totalVisits,
    uniqueBandsSeenCount,
    maxSpent,
    minSpent,
    avgSpent,
    totalSpent,
    uniqueCitiesSeenCount,
    uniqueVenuesSeenCount,
    categoryCounts,
    bandCounts,
    yearCounts,
    cityCounts,
    venueCounts,
  } = data || {};

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={2} width="100%">
      <Typography textAlign="center" m={2} variant="h3" color="primary.main">
        Profile Data
      </Typography>
      <Masonry columns={{ sm: 1, md: 2 }} spacing={2}>
        <BandsOverview
          isLoading={isLoading}
          uniqueBandsSeenCount={uniqueBandsSeenCount}
          bandCounts={bandCounts}
        />
        <EventsOverview
          totalVisits={totalVisits}
          categoryCounts={categoryCounts}
          yearCounts={yearCounts}
          isLoading={isLoading}
        />

        <SpendingOverview
          isLoading={isLoading}
          maxSpent={maxSpent}
          minSpent={minSpent}
          avgSpent={avgSpent}
          totalSpent={totalSpent}
        />

        <LocationsOverview
          isLoading={isLoading}
          uniqueCitiesSeenCount={uniqueCitiesSeenCount}
          uniqueVenuesSeenCount={uniqueVenuesSeenCount}
          citiesSeenCount={cityCounts}
          venuesSeenCount={venueCounts}
        />
      </Masonry>
    </Box>
  );
};

export default Profile;
