import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../../store/StoreContext";
import { dataGridWrapperStyles } from "./styles";

export const TableBody = observer(function TableBody() {
  const {
    concerts: { concerts },
  } = useRootStore();

  // can be specified separately in the columns.tsx
  const columns: GridColDef[] = [
    {
      field: "band",
      headerName: "Band",
      // width: 150,
    },
    {
      field: "year",
      headerName: "Year",
      // width: 100,
    },
    {
      field: "city",
      headerName: "City",
      // width: 100,
    },
  ];

  return (
    <Box sx={dataGridWrapperStyles}>
      <Box>
        <DataGrid
          columns={columns}
          rows={concerts}
          autosizeOptions={{ columns: ["band", "year", "city"], includeOutliers: true }}
          rowHeight={35}
          columnHeaderHeight={35}
          pageSizeOptions={[5, 10, 15]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      </Box>
    </Box>
  );
});
