import { Accordion, AccordionDetails, AccordionSummary, Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";

import { FilterInputType } from "../../../components/DataGridFilters/constants";
import { DataGridFilters } from "../../../components/DataGridFilters/dataGridFilters";
import { type EventCategoryFilter } from "../../../store/eventList/eventFilters/types";
import { useRootStore } from "../../../store/StoreContext";
import { EventsPageIds, eventsPageText } from "../constants";

import type {
  FilterInputsConfig,
  ToggleButtonFilterProps,
} from "../../../components/DataGridFilters/types";
import { eventCategoriesList } from "../../EventDetails/constants.ts";
import { filterContainerStyles, filterDetailsStyles, filterSummaryStyles } from "./styles";

const {
  inputs: { band, city, eventTitle },
  buttons,
} = eventsPageText["ENGLISH"].filters;

export const EventFilters: React.FC = observer(function EventFilters() {
  const {
    eventListStore: {
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

  const eventFilterToggleButtons: ToggleButtonFilterProps = useMemo(() => {
    return {
      inputType: FilterInputType.toggleButton,
      id: EventsPageIds.eventTypeToggle,
      label: "Event Type",
      value: currentEventType,
      options: eventCategoriesList,
      onChange: (_: React.MouseEvent<HTMLElement>, newFestivalType: EventCategoryFilter) => {
        if (newFestivalType !== null) {
          setEventType(newFestivalType);
        }
      },
    };
  }, [currentEventType, setEventType]);

  const eventFilterInputConfig: FilterInputsConfig = useMemo(() => {
    return {
      inputs: [
        {
          inputType: FilterInputType.text,
          id: EventsPageIds.eventTitleFilter,
          label: eventTitle.label,
          placeholder: eventTitle.placeholder,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEventTitle(e.target.value),
          value: currentEventTitle,
        },
        {
          inputType: FilterInputType.text,
          id: EventsPageIds.cityFilter,
          label: city.label,
          placeholder: city.placeholder,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value),
          value: currentCity,
        },
        {
          inputType: FilterInputType.text,
          id: EventsPageIds.bandFilter,
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
          id: EventsPageIds.resetButton,
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
            filterProps={eventFilterInputConfig}
            filterToggles={eventFilterToggleButtons}
          />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
});
