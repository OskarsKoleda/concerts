import { Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { readonlyFieldStyle } from "./styles";

import type { ReactNode } from "react";
import type { SxProps } from "@mui/material";

interface ReadonlyFieldProps {
  label: ReactNode;
  tooltipText?: string;
  value?: string;
  id?: string;
  sx?: SxProps;
}

export function ReadonlyField({
  label,
  tooltipText,
  sx,
  value = "-",
  id,
}: ReadonlyFieldProps): JSX.Element {
  return (
    <Box display="flex" flexDirection="column" sx={sx}>
      <Typography variant="caption">{label}</Typography>
      <Tooltip title={tooltipText || ""}>
        <Typography id={id} sx={readonlyFieldStyle} variant="subtitle2">
          {value}
        </Typography>
      </Tooltip>
    </Box>
  );
}
