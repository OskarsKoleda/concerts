import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";

import { filterContainerStyles, filterDetailsStyles, filterSummaryStyles } from "./styles";

// const {
//   inputs: { band, city, eventTitle },
//   buttons,
// } = eventsPageText["ENGLISH"].filters;

export const EventFilters: React.FC = observer(function EventFilters() {
  // const eventFilterToggleButtons: ToggleButtonFilterProps = useMemo(() => {
  //   return {
  //     inputType: FilterInputType.toggleButton,
  //     id: EventsPageIds.eventTypeToggle,
  //     label: "Event Type",
  //     value: currentEventType,
  //     options: eventCategoriesList,
  //     onChange: (_: React.MouseEvent<HTMLElement>, newFestivalType: EventCategoryFilter) => {
  //       if (newFestivalType) {
  //         setEventType(newFestivalType);
  //       }
  //     },
  //   };
  // }, [currentEventType, setEventType]);

  // const eventFilterInputConfig: FilterInputsConfig = useMemo(() => {
  //   return {
  //     inputs: [
  //       {
  //         inputType: FilterInputType.text,
  //         id: EventsPageIds.eventTitleFilter,
  //         label: eventTitle.label,
  //         placeholder: eventTitle.placeholder,
  //         onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEventTitle(e.target.value),
  //         value: currentEventTitle,
  //       },
  //       {
  //         inputType: FilterInputType.text,
  //         id: EventsPageIds.cityFilter,
  //         label: city.label,
  //         placeholder: city.placeholder,
  //         onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value),
  //         value: currentCity,
  //       },
  //       {
  //         inputType: FilterInputType.text,
  //         id: EventsPageIds.bandFilter,
  //         label: band.label,
  //         placeholder: band.placeholder,
  //         onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBand(e.target.value),
  //         value: currentBand,
  //       },
  //     ],
  //     buttons: [
  //       {
  //         id: EventsPageIds.resetButton,
  //         disabled: false, // isResetFiltersDisabled
  //         label: buttons.reset.label,
  //         onClick: resetFilters,
  //         color: "primary",
  //         size: "medium",
  //         variant: "outlined",
  //       },
  //       {
  //         id: "filterButton",
  //         disabled: false,
  //         label: "Filter",
  //         color: "primary",
  //         size: "medium",
  //         variant: "contained",
  //       },
  //     ],
  //   };
  // }, [currentBand, currentCity, currentEventTitle, resetFilters, setBand, setCity, setEventTitle]);

  return (
    <Paper sx={filterContainerStyles}>
      <Accordion>
        <AccordionSummary sx={filterSummaryStyles}>
          <Typography variant="h5">Event Filters</Typography>
        </AccordionSummary>
        <AccordionDetails sx={filterDetailsStyles}>
          TO BE ADDED
          {/* <DataGridFilters
            filterProps={eventFilterInputConfig}
            filterToggles={eventFilterToggleButtons}
          /> */}
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
});
