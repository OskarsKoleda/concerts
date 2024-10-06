import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useRootStore } from "../../store/StoreContext";
import { ContentLoader } from "../../components/ContentLoader/contentLoader";
import { ConcertRequests } from "../../store/transport/concertTransport/constants";

import { ConcertsTable } from "./ConcertsTable/concertsTable";
import { ConcertsFilters } from "./concertsFIlters/concertsFilters";
import { ConcertsList } from "./concertsList/concertsList";
import { contentContainer } from "./styles";

export const ConcertsPage: React.FC = observer(function ConcertsPage() {
  const {
    applicationStore: { listViewIsSelected },
    concertsStore: {
      loadConcerts: fetchAllConcerts,
      transport: {
        requestHandler: { resetRequest, isSuccessfulRequest },
      },
    },
  } = useRootStore();

  const concertsHaveLoaded: boolean = isSuccessfulRequest(ConcertRequests.getConcertsData);

  useEffect(() => {
    fetchAllConcerts();
  }, [fetchAllConcerts]);

  useEffect(
    () => () => {
      resetRequest(ConcertRequests.getConcertsData);
    },
    [],
  );

  return (
    <ContentLoader isLoading={!concertsHaveLoaded}>
      <Box sx={contentContainer}>
        <ConcertsFilters />
        {listViewIsSelected ? <ConcertsList /> : <ConcertsTable />}
      </Box>
    </ContentLoader>
  );
});
