import { Accordion, AccordionDetails, AccordionSummary, Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";

import { FilterInputType } from "../../../components/DataGridFilters/constants";
import { ConcertsPageIds, concertsPageText } from "../constants";
import { DataGridFilters } from "../../../components/DataGridFilters/dataGridFilters";

import { filterContainerStyles, filterSummaryStyles } from "./styles";

import type { FilterInputsConfig } from "../../../components/DataGridFilters/types";

export const ConcertsFilters: React.FC = observer(function ConcertsFilters() {
  // here filter store update functions extracted

  const { inputs, buttons } = concertsPageText.filters;

  const concertsFilterInputConfig: FilterInputsConfig = useMemo(() => {
    return {
      inputs: [
        {
          inputType: FilterInputType.text,
          id: ConcertsPageIds.eventTitleFilter,
          label: inputs.eventTitle.label,
          placeholder: inputs.eventTitle.placeholder,
          // onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEventTitle(e.target.value),
          onChange: () => {},
          value: "nothing",
        },
        {
          inputType: FilterInputType.text,
          id: ConcertsPageIds.cityFilter,
          label: inputs.city.label,
          placeholder: inputs.city.placeholder,
          // onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value),
          onChange: () => {},
          value: "nothing",
        },
      ],
      buttons: [
        {
          disabled: false, // isResetFiltersDisabled
          id: ConcertsPageIds.filterButton,
          label: buttons.reset.label,
          // onClick: () => resetConcertsFilters(),
          onClick: () => {},
          color: "primary",
          size: "medium",
          variant: "outlined",
        },
        {
          disabled: false,
          id: "filterButton",
          label: "Filter",
          onClick: () => {},
          color: "primary",
          size: "medium",
          variant: "contained",
        },
      ],
    };
  }, []);

  return (
    <Paper sx={filterContainerStyles}>
      <Accordion>
        <AccordionSummary sx={filterSummaryStyles}>Filter By</AccordionSummary>
        <AccordionDetails>
          <DataGridFilters filterProps={concertsFilterInputConfig} />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
});
