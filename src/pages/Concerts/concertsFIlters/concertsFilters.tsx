import { Accordion, AccordionDetails, AccordionSummary, Paper } from "@mui/material";
import { observer } from "mobx-react-lite";

import { filterContainerStyles } from "./styles";
import { FilterInputType } from "../../../components/DataGridFilters/constants";
import { FilterInputsConfig } from "../../../components/DataGridFilters/types";
import { concertsPageIds, concertsPageText } from "../constants";
import { useMemo } from "react";
import { DataGridFilters } from "../../../components/DataGridFilters/dataGridFilters";

export const ConcertsFilters: React.FC = observer(function ConcertsFilters() {
  // here filter store update functions extracted
  // const {} = useRootStore();

  const { inputs, buttons } = concertsPageText.filters;

  const concertsFilterInputConfig: FilterInputsConfig = useMemo(() => {
    return {
      inputs: [
        {
          inputType: FilterInputType.text,
          id: concertsPageIds.eventTitleFilter,
          label: inputs.eventTitle.label,
          placeholder: inputs.eventTitle.placeholder,
          // onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEventTitle(e.target.value),
          onChange: ()=>{},
          value: "nothing",
        },
      ],
      buttons: [
        {
          disabled: false, // isResetFiltersDisabled
          id: concertsPageIds.filterButton,
          label: buttons.reset.label,
          // onClick: () => resetConcertsFilters(),
          onClick: () => {},
          color: "primary",
          size: "medium",
          variant: "outlined",
        },
      ],
    };
  }, []);

  return (
    <Paper sx={filterContainerStyles}>
      <Accordion>
        <AccordionSummary>Filter By</AccordionSummary>
        <AccordionDetails>
          <DataGridFilters filterProps={concertsFilterInputConfig} />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
});
