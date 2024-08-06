import { Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import { format, parseISO } from "date-fns";

import { useRootStore } from "../../../../store/StoreContext";

import { tableStyles } from "./styles";

import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

export const TableBody = observer(function TableBody() {
  const {
    concertsStore: { concerts },
  } = useRootStore();

  const renderBandsCell = (params: GridRenderCellParams) => (
    <Tooltip title={params.value.join(", ")}>
      <span>{params.value.join(", ")}</span>
    </Tooltip>
  );

  const renderDateCell = (params: GridRenderCellParams) => {
    if (!params.value) {
      return <span>-</span>;
    }

    return <span>{format(parseISO(params.value), "dd.MM.yyyy")}</span>;
  };

  // can be specified separately in the columns.tsx
  const columns: GridColDef[] = [
    {
      field: "eventType",
      headerName: "Event Type",
      disableColumnMenu: true,
      width: 100,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "bands",
      headerName: "Bands",
      renderCell: renderBandsCell,
      minWidth: 440,
    },
    {
      field: "city",
      headerName: "City",
      width: 200,
    },
    {
      field: "startDate",
      headerName: "Date",
      width: 100,
      renderCell: renderDateCell,
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 100,
      renderCell: renderDateCell,
    },
    { field: "ticketPrice", headerName: "Ticket (€)", flex: 1 },
  ];

  // TODO table renendered with every click
  return (
    <DataGrid
      sx={tableStyles}
      columns={columns}
      rows={concerts}
      disableRowSelectionOnClick={true}
      disableColumnMenu={true}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 25, page: 0 },
        },
      }}
      hideFooterSelectedRowCount={true}
      autoHeight
      rowHeight={40}
    />
  );
});
