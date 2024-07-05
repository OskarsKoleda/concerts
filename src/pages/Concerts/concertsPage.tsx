import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import ConcertListPage from "./ConcertList/concertList";

export const ConcertsPage: React.FC = observer(function ConcertsPage() {
  return (
    <Box>
      <ConcertListPage />
    </Box>
  );
});
