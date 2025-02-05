import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { ContentLoader } from "../../components/ContentLoader/contentLoader";
import { useRootStore } from "../../store/StoreContext";
import { ConcertListRequests } from "../../store/transport/concertListTransport/constants";

import { ConcertCardsList } from "./concertCardsList/concertCards";
import { ConcertFilters } from "./concertFIlters/concertFilters";
import { ConcertsTable } from "./concertsTable/concertsTable";
import { contentContainer } from "./styles";

export const ConcertList: React.FC = observer(function ConcertList() {
  const {
    applicationStore: { listViewIsSelected },
    concertListStore: {
      loadEvents: fetchAllConcerts,

      concertListTransport: {
        requestHandler: { resetRequest, isSuccessfulRequest },
      },
    },
  } = useRootStore();

  const concertsHaveLoaded: boolean = isSuccessfulRequest(ConcertListRequests.getConcertsData);

  useEffect(() => {
    fetchAllConcerts();
  }, [fetchAllConcerts]);

  useEffect(
    () => () => {
      resetRequest(ConcertListRequests.getConcertsData);
    },
    [],
  );

  return (
    <ContentLoader isLoading={!concertsHaveLoaded}>
      <Box sx={contentContainer}>
        <ConcertFilters />
        {listViewIsSelected ? <ConcertCardsList /> : <ConcertsTable />}
      </Box>
    </ContentLoader>
  );
});
