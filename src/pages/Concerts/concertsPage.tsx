import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useRootStore } from "../../store/StoreContext";

import ConcertListPage from "./concertsGrid/concertsGrid";
import { ConcertsTable } from "./ConcertsTable/concertsTable";
import { ConcertsFilters } from "./concertsFIlters/concertsFilters";

export const ConcertsPage: React.FC = observer(function ConcertsPage() {
  const {
    applicationStore: { listViewIsSelected },
    concertsStore: { loadConcerts: fetchAllConcerts },
  } = useRootStore();

  useEffect(() => {
    fetchAllConcerts();
  }, [fetchAllConcerts]);

  return (
    <Box>
      <ConcertsFilters />
      {listViewIsSelected ? <ConcertListPage /> : <ConcertsTable />}
    </Box>
  );
});
