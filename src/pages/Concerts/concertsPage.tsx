import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useRootStore } from "../../store/StoreContext";

import ConcertListPage from "./concertsGrid/concertsGrid";
import { ConcertsTable } from "./ConcertsTable/concertsTable";
import { concertsContainerStyles, headerStyles, headerTitleStyles } from "./styles";
import { ContentLoader } from "../../components/ContentLoader/contentLoader";

export const ConcertsPage: React.FC = observer(function ConcertsPage() {
  const {
    applicationStore: { listViewIsSelected },
    concertsStore: { fetchAllConcerts, isLoading },
  } = useRootStore();

  useEffect(() => {
    fetchAllConcerts();
  }, [fetchAllConcerts]);

  return (
    <Box>
      <Container sx={headerStyles} component="section">
        <Typography sx={headerTitleStyles} variant="h3">
          The List of Concerts
        </Typography>
      </Container>
      
      <Paper sx={concertsContainerStyles}>
        <Accordion>
          <AccordionSummary>Filter By</AccordionSummary>
          <AccordionDetails>This is details</AccordionDetails>
        </Accordion>
      </Paper>

      <ContentLoader isLoading={isLoading}>
        <Paper elevation={5} sx={concertsContainerStyles}>
          {listViewIsSelected ? <ConcertListPage /> : <ConcertsTable />}
        </Paper>
      </ContentLoader>
    </Box>
  );
});
