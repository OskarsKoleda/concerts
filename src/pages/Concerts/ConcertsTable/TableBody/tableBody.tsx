import { Box, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../../store/StoreContext";
import { dataGridWrapperStyles, tableStyles } from "./styles";

export const TableBody = observer(function TableBody() {
  const {
    concertsStore: { concerts },
  } = useRootStore();

  // can be specified separately in the columns.tsx
  const columns: GridColDef[] = [
    {
      field: "eventType",
      headerName: "Event Type",
      disableColumnMenu: true,

    },
    {
      field: "title",
      headerName: "Title",
      width: 220,
    },
    {
      field: "bands",
      headerName: "Bands",
      renderCell: (params) => {
        return (
          <Tooltip title={params.value.join(", ")}>
            <span>{params.value.join(", ")}</span>
          </Tooltip>
        );
      },
      width: 350,
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
    },
    {
      field: "startDate",
      headerName: "Date",
      width: 150,
    },
    { field: "ticketPrice", headerName: "Ticket (€)", width: 72 },
  ];

  // TODO table renendered with every click
  return (
    <Box sx={dataGridWrapperStyles}>
      <Box width={"80%"}>
        <DataGrid
          disableRowSelectionOnClick
          sx={tableStyles}
          columns={columns}
          rows={concerts}
          pageSizeOptions={[15]}
          initialState={{
            pagination: { paginationModel: { pageSize: 15 } },
          }}
        />
      </Box>
    </Box>
  );
});
