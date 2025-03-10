import { Tooltip } from "@mui/material";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import { observer } from "mobx-react-lite";

import { useRootStore } from "../../../../store/StoreContext";

import { DATE_FORMAT } from "../../../../common/constants/appConstant.ts";
import { tableStyles } from "./styles";

export const TableBody = observer(function TableBody() {
  const {
    eventListStore: { events },
  } = useRootStore();

  const renderBandsCell = (params: GridRenderCellParams) => {
    if (!params.value) {
      return <span>-</span>;
    } else {
      return (
        <Tooltip title={params.value.join(", ")}>
          <span>{params.value.join(", ")}</span>
        </Tooltip>
      );
    }
  };

  const renderDateCell = (params: GridRenderCellParams) => {
    if (!params.value) {
      return <span>-</span>;
    }

    return <span>{format(parseISO(params.value), DATE_FORMAT)}</span>;
  };

  // can be specified separately in the columns.ts
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

  // TODO table rendered with every click
  return (
    <DataGrid
      sx={tableStyles}
      columns={columns}
      rows={events}
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
