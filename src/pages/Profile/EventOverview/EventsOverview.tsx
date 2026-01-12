import { Box, Paper } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";

import { renderStatsItem } from "../utils";
import { masonryItemStyles } from "../styles";

import { pieChartStyles } from "./styles";

interface EventsOverviewProps {
  totalVisits?: number;
  categoryCounts?: Record<string, number>;
  yearCounts?: Record<string, number>;
  isLoading: boolean;
}

// TODO: handle 0 cases
const EventsOverview = ({
  totalVisits,
  isLoading,
  categoryCounts,
  yearCounts,
}: EventsOverviewProps) => {
  const transformedCategoryData = Object.entries(categoryCounts || {}).map(
    ([label, value], index) => ({
      id: index,
      value,
      label,
    }),
  );

  const transformedYearData = Object.entries(yearCounts || {})
    .sort(([yearA], [yearB]) => yearA.localeCompare(yearB))
    .map(([year, count]) => ({
      year,
      count,
    }));

  return (
    <Paper sx={masonryItemStyles}>
      {renderStatsItem({ label: "Events Visited:", value: totalVisits, isLoading })}
      {!isLoading && transformedCategoryData.length > 0 && (
        <Box height={300}>
          <PieChart
            series={[
              {
                data: transformedCategoryData,
                innerRadius: 20,
                outerRadius: 120,
                paddingAngle: 2,
                arcLabel: "value",
                arcLabelMinAngle: 10,
                highlightScope: { fade: "global", highlight: "item" },
              },
            ]}
            sx={pieChartStyles}
          />
        </Box>
      )}
      {!isLoading && transformedYearData.length > 0 && (
        <Box height={300} mb={2}>
          <BarChart
            dataset={transformedYearData}
            xAxis={[{ scaleType: "band", dataKey: "year" }]}
            series={[{ dataKey: "count", label: "Events", color: "#7C4DFF" }]}
          />
        </Box>
      )}
    </Paper>
  );
};

export default EventsOverview;
