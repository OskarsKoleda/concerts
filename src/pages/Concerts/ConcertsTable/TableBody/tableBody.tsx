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
      width: 150,
    },
    {
      field: "year",
      headerName: "Year",
      width: 100,
    },
    {
        field: "city",
        headerName: "City",
        width: 100,
      },
  ];

  return (
    <Box sx={dataGridWrapperStyles}>
      <DataGrid columns={columns} rows={concerts}/>
    </Box>
  );
});
