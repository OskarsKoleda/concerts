import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

export const ConcertDetailsPage: React.FC = observer(function ConcertDetailsPage() {
  const { id } = useParams<{ id: string }>();
  return <Box>this is concert

    {id}
  </Box>;
});
