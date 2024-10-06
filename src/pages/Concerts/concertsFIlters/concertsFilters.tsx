import { Accordion, AccordionDetails, AccordionSummary, Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";

import { FilterInputType } from "../../../components/DataGridFilters/constants";
import { ConcertsPageIds, concertsPageText } from "../constants";
import { DataGridFilters } from "../../../components/DataGridFilters/dataGridFilters";
import { useRootStore } from "../../../store/StoreContext";

import { filterContainerStyles, filterDetailsStyles, filterSummaryStyles } from "./styles";

import type { FilterInputsConfig } from "../../../components/DataGridFilters/types";

export const ConcertsFilters: React.FC = observer(function ConcertsFilters() {
  const { inputs, buttons } = concertsPageText.filters;
  const {
    concertsStore: {
      concertsFilters: {
        setEventTitle,
        setCity,
        setEventType,
        eventTitle,
        city,
        eventType,
        resetFilters,
      },
    },
  } = useRootStore();

  const concertsFilterInputConfig: FilterInputsConfig = useMemo(() => {
    return {
      inputs: [
        {
          inputType: FilterInputType.text,
          id: ConcertsPageIds.eventTitleFilter,
          label: inputs.eventTitle.label,
          placeholder: inputs.eventTitle.placeholder,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEventTitle(e.target.value),
          value: eventTitle,
        },
        {
          inputType: FilterInputType.text,
          id: ConcertsPageIds.cityFilter,
          label: inputs.city.label,
          placeholder: inputs.city.placeholder,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value),
          value: city,
        },
        {
          inputType: FilterInputType.toggleButton,
          id: ConcertsPageIds.eventTypeToggle,
          label: "Event Type",
          value: eventType,
          options: ["Concert", "Festival", "All"],
          onChange: (_: React.MouseEvent<HTMLElement>, newFestivalType: string) => {
            if (newFestivalType !== null) {
              setEventType(newFestivalType);
            }
          },
        },
      ],
      buttons: [
        {
          disabled: false, // isResetFiltersDisabled
          id: ConcertsPageIds.resetButton,
          label: buttons.reset.label,
          // onClick: () => resetConcertsFilters(),
          onClick: resetFilters,
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
  }, [eventType, eventTitle, city]);

  return (
    <Paper sx={filterContainerStyles}>
      <Accordion>
        <AccordionSummary sx={filterSummaryStyles}>Filter By</AccordionSummary>
        <AccordionDetails sx={filterDetailsStyles}>
          <DataGridFilters filterProps={concertsFilterInputConfig} />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
});
