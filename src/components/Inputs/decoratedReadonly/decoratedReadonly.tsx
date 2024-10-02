import { Box, Chip, Tooltip, Typography } from "@mui/material";

export enum MaterialColors {
  primary = "primary",
  success = "success",
}

interface DecoratedReadonlyFieldProps {
  label: string;
  color: MaterialColors; // enum for colors
  value: string;
}

export function DecoratedReadonlyField({
  label,
  color,
  value,
}: DecoratedReadonlyFieldProps): JSX.Element {
  return (
    <Box>
      <Typography display="block" variant="caption">
        {label}
      </Typography>
      <Tooltip title={"Any tooltip for now"}>
        <Chip label={value} color={color} variant="filled" />
      </Tooltip>
    </Box>
  );
}
