import { Box, Tooltip } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../../store/StoreContext";
import { dataGridWrapperStyles, tableStyles } from "./styles";
import { format, parseISO } from "date-fns";

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
      flex: 1,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
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
      minWidth: 350,
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      width: 200,
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Date",
      width: 150,
      renderCell: (params) => {
        return <span>{format(parseISO(params.value), "dd.MM.yyyy")}</span>;
      },
      flex: 1,
    },
    { field: "ticketPrice", headerName: "Ticket (€)", flex: 1 },
  ];

  // TODO table renendered with every click
  return (
    <Box sx={dataGridWrapperStyles}>
      <Box width={"80%"}>
        <DataGrid
          disableRowSelectionOnClick
          autoHeight
          autoPageSize
          sx={tableStyles}
          columns={columns}
          rows={concerts}
        />
      </Box>
    </Box>
  );
});
