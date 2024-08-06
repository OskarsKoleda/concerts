import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useRootStore } from "../../store/StoreContext";

import ConcertListPage from "./ConcertList/concertList";
import { ConcertsTable } from "./ConcertsTable/concertsTable";

export const ConcertsPage: React.FC = observer(function ConcertsPage() {
  const {
    applicationStore: { listViewIsSelected },
    concertsStore: { fetchAllConcerts },
  } = useRootStore();

  useEffect(() => {
    fetchAllConcerts();
  }, [fetchAllConcerts]);

  return (
    <Box>
      {listViewIsSelected ? (
        <ConcertListPage />
      ) : (
        <Box>
          <ConcertsTable />
        </Box>
      )}
    </Box>
  );
});
