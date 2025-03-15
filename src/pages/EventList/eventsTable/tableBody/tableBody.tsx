import { DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../../store/StoreContext";
import { tableStyles } from "./styles.ts";
import { columns } from "./columns.tsx";

export const TableBody = observer(function TableBody() {
  const {
    eventListStore: { events },
  } = useRootStore();

  return (
    <DataGrid
      sx={tableStyles}
      getRowId={(row) => row.eventId}
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
  );
});
