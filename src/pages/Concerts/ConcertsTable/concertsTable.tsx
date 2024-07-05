import { Box } from "@mui/material";
import { TableHeader } from "./TableHeader/tableHeader";
import { TableBody } from "./TableBody/tableBody";

export const ConcertsTable = () => {
  return (
    <Box>
      <TableHeader />
      <TableBody />
    </Box>
  );
};
