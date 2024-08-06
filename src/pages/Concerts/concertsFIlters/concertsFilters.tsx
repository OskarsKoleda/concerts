import { Accordion, AccordionDetails, AccordionSummary, Paper } from "@mui/material";
import { observer } from "mobx-react-lite";

import { filterContainerStyles } from "./styles";

export const ConcertsFilters: React.FC = observer(function ConcertsFilters() {
  // here filter store update functions extracted
  // const {} = useRootStore();

  // const ConcertsFilterInputConfiguration:

  return (
    <Paper sx={filterContainerStyles}>
      <Accordion>
        <AccordionSummary>Filter By</AccordionSummary>
        <AccordionDetails>This is details</AccordionDetails>
      </Accordion>
    </Paper>
  );
});
