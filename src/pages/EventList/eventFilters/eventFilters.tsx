import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";

import { FilterInputType } from "../../../components/DataGridFilters/constants";
import { type EventCategoryFilter } from "../../../store/eventList/eventFilters/types";
import { useRootStore } from "../../../store/StoreContext";
import { EventsPageIds, eventsPageText } from "../constants";
import { eventCategoriesList } from "../../../common/constants/appConstant.ts";
import DataGridFilters from "../../../components/DataGridFilters/DataGridFilters.tsx";

import { filterContainerStyles, filterDetailsStyles, filterSummaryStyles } from "./styles";

import type {
  FilterInputsConfig,
  ToggleButtonFilterProps,
} from "../../../components/DataGridFilters/types";

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
        if (newFestivalType) {
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
      ],
      buttons: [
        {
          id: EventsPageIds.resetButton,
          disabled: false, // isResetFiltersDisabled
          label: buttons.reset.label,
          onClick: resetFilters,
          color: "primary",
          size: "medium",
          variant: "outlined",
        },
        {
          id: "filterButton",
          disabled: false,
          label: "Filter",
          color: "primary",
          size: "medium",
          variant: "contained",
        },
      ],
    };
  }, [currentBand, currentCity, currentEventTitle, resetFilters, setBand, setCity, setEventTitle]);

  return (
    <Paper sx={filterContainerStyles}>
      <Accordion>
        <AccordionSummary sx={filterSummaryStyles}>
          <Typography variant="h5">Event Filters</Typography>
        </AccordionSummary>
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
