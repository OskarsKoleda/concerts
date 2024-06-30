import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRootStore } from "../../../store/StoreContext";

export const ConcertDetails: React.FC = observer(function ConcertDetails() {
  // use local state? or something global?

  const { id } = useParams<{ id: string }>();
  const {
    concerts: { getConcert, currentConcert },
  } = useRootStore();

  useEffect(() => {
    if (id) {
      getConcert(id);
    }
  }, [id, getConcert]);

  return (
    <Box>
      {currentConcert ? (
        <>
          <Typography variant="h4">{currentConcert.band}</Typography>
          <Typography variant="h6">{currentConcert.year}</Typography>
          <Typography variant="body1">{currentConcert.city}</Typography>
        </>
      ) : (
        "loading"
      )}
    </Box>
  );
});
