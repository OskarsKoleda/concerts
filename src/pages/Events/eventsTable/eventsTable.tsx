import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { columns } from "./columns";
import { tableStyles } from "./styles";

import type { ServerEventData } from "../../../common/types/eventTypes";

interface EventsTableProps {
  events: ServerEventData[];
}

const EventsTable = ({ events }: EventsTableProps) => {
  return (
    <Box>
      <DataGrid
        sx={tableStyles}
        getRowId={(row) => row.slug}
        columns={columns}
        rows={events}
        disableRowSelectionOnClick={true}
        disableColumnMenu={true}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          },
        }}
        rowHeight={40}
      />
    </Box>
  );
};

export default EventsTable;
