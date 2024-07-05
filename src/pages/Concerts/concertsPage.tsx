import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import ConcertListPage from "./ConcertList/concertList";
import { ConcertsTable } from "./ConcertsTable/concertsTable";
import { useRootStore } from "../../store/StoreContext";
import { useEffect } from "react";

export const ConcertsPage: React.FC = observer(function ConcertsPage() {
  const {
    applicationStore: { listViewIsSelected },
    concerts: { fetchAllConcerts },
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
