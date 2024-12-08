import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { ContentLoader } from "../../components/ContentLoader/contentLoader";
import { useRootStore } from "../../store/StoreContext";
import { ConcertListRequests } from "../../store/transport/concertListTransport/constants";

import { ConcertCardsList } from "./concertCardsList/concertCards";
import { ConcertsFilters } from "./concertsFIlters/concertsFilters";
import { ConcertsTable } from "./concertsTable/concertsTable";
import { contentContainer } from "./styles";

export const ConcertList: React.FC = observer(function ConcertList() {
  const {
    applicationStore: { listViewIsSelected },
    concertListStore: {
      loadConcerts: fetchAllConcerts,

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
        <ConcertsFilters />
        {listViewIsSelected ? <ConcertCardsList /> : <ConcertsTable />}
      </Box>
    </ContentLoader>
  );
});
