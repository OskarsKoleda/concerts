import { Accordion, AccordionDetails, AccordionSummary, Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";

import { FilterInputType } from "../../../components/DataGridFilters/constants";
import { DataGridFilters } from "../../../components/DataGridFilters/dataGridFilters";
import { EventType, type EventTypeFilter } from "../../../store/eventList/eventFilters/types";
import { useRootStore } from "../../../store/StoreContext";
import { ConcertsPageIds, concertsPageText } from "../constants";

import type {
  FilterInputsConfig,
  ToggleButtonFilterProps,
} from "../../../components/DataGridFilters/types";
import { filterContainerStyles, filterDetailsStyles, filterSummaryStyles } from "./styles";

export const ConcertFilters: React.FC = observer(function ConcertFilters() {
  const {
    inputs: { band, city, eventTitle },
    buttons,
  } = concertsPageText.filters;
  const {
    concertListStore: {
      eventsFilters: {
        setEventTitle,
        setCity,
        setBand,
        setEventType,
        eventTitle: currentEventTitle,
        city: currentCity,
        eventType: currentEventType,
        band: currentBand,
        resetFilters,
      },
    },
  } = useRootStore();

  const concertFilterToggleButtons: ToggleButtonFilterProps = useMemo(() => {
    return {
      inputType: FilterInputType.toggleButton,
      id: ConcertsPageIds.eventTypeToggle,
      label: "Event Type",
      value: currentEventType,
      options: Object.values(EventType),
      onChange: (_: React.MouseEvent<HTMLElement>, newFestivalType: EventTypeFilter) => {
        if (newFestivalType !== null) {
          setEventType(newFestivalType);
        }
      },
    };
  }, [currentEventType, setEventType]);

  const concertFilterInputConfig: FilterInputsConfig = useMemo(() => {
    return {
      inputs: [
        {
          inputType: FilterInputType.text,
          id: ConcertsPageIds.eventTitleFilter,
          label: eventTitle.label,
          placeholder: eventTitle.placeholder,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEventTitle(e.target.value),
          value: currentEventTitle,
        },
        {
          inputType: FilterInputType.text,
          id: ConcertsPageIds.cityFilter,
          label: city.label,
          placeholder: city.placeholder,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value),
          value: currentCity,
        },
        {
          inputType: FilterInputType.text,
          id: ConcertsPageIds.bandFilter,
          label: band.label,
          placeholder: band.placeholder,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBand(e.target.value),
          value: currentBand,
        },
        // {
        //   inputType: FilterInputType.toggleButton,
        //   id: ConcertsPageIds.eventTypeToggle,
        //   label: "Event Type",
        //   value: currentEventType,
        //   options: ["Concert", "Festival", "All"],
        //   onChange: (_: React.MouseEvent<HTMLElement>, newFestivalType: EventTypeFilter) => {
        //     if (newFestivalType !== null) {
        //       setEventType(newFestivalType);
        //     }
        //   },
        // },
      ],
      buttons: [
        {
          disabled: false, // isResetFiltersDisabled
          id: ConcertsPageIds.resetButton,
          label: buttons.reset.label,
          onClick: resetFilters,
          color: "primary",
          size: "medium",
          variant: "outlined",
        },
        {
          disabled: false,
          id: "filterButton",
          label: "Filter",
          color: "primary",
          size: "medium",
          variant: "contained",
        },
      ],
    };
  }, [
    eventTitle.label,
    eventTitle.placeholder,
    city.label,
    city.placeholder,
    band.label,
    band.placeholder,
    currentEventTitle,
    currentCity,
    currentBand,
    buttons.reset.label,
    resetFilters,
    setEventTitle,
    setCity,
    setBand,
  ]);

  return (
    <Paper sx={filterContainerStyles}>
      <Accordion>
        <AccordionSummary sx={filterSummaryStyles}>Filter By</AccordionSummary>
        <AccordionDetails sx={filterDetailsStyles}>
          <DataGridFilters
            filterProps={concertFilterInputConfig}
            filterToggles={concertFilterToggleButtons}
          />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
});
