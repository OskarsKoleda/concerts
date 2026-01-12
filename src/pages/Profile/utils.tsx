import { Box, Skeleton, Typography } from "@mui/material";

interface RenderStatsItemProps {
  label: string;
  value: string | number | undefined;
  suffix?: string;
  isLoading?: boolean;
}

export const renderStatsItem = ({
  label,
  value,
  suffix = "",
  isLoading = false,
}: RenderStatsItemProps) => (
  <Box display="flex" justifyContent="space-between">
    <Typography>{label}</Typography>
    {isLoading ? (
      <Skeleton width={40} />
    ) : (
      <Typography>
        {value}
        {suffix}
      </Typography>
    )}
  </Box>
);

export const renderListWithCount = (list: [string, number][], title: string) => (
  <>
    <Box display="flex" justifyContent="space-between" mt={2} mb={1}>
      <Typography variant="h6">{title}</Typography>
    </Box>
    {list.map(([label, count]) => (
      <Box display="flex" justifyContent="space-between" key={label}>
        <Typography variant="body2">{label}</Typography>
        <Typography variant="body2" fontWeight="bold">
          {count}
        </Typography>
      </Box>
    ))}
  </>
);

export const getTopItems = (
  counts: Record<string, number> | undefined,
  limit: number,
): [string, number][] => {
  if (!counts) {
    return [];
  }

  const groupedByCount: Record<number, string[]> = {};

  Object.entries(counts).forEach(([label, count]) => {
    if (!groupedByCount[count]) {
      groupedByCount[count] = [];
    }

    groupedByCount[count].push(label);
  });

  const sortedUniqueCounts = Object.keys(groupedByCount)
    .map(Number)
    .sort((a, b) => b - a);

  return sortedUniqueCounts.slice(0, limit).map((count) => {
    const labels = groupedByCount[count].join(", ");

    return [labels, count];
  });
};
