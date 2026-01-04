import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { eventCategoriesList } from "../../../common/constants/appConstant";
import { InputType } from "../../../components/FormLayout/constants";
import { eventsPageText } from "../constants";
import DataGridFilters from "../../../components/DataGridFilters/dataGridFilters";

import { filterContainerStyles, filterDetailsStyles, filterSummaryStyles } from "./styles";

import type {
  FilterInputsConfig,
  ToggleButtonFilterProps,
} from "../../../components/DataGridFilters/types";
import type { EventCategoryType } from "../../EventDetails/types";

const {
  inputs: { band, city: cityTexts, eventTitle: eventTitleTexts },
  buttons,
} = eventsPageText["ENGLISH"].filters;

export const EventFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState<EventCategoryType | "All">("All");
  // const [currentBand, setBand] = useState("");

  // TODO: there is a bug, when opening URL with filter
  useEffect(() => {
    const timer = setTimeout(() => {
      const newParams = { ...Object.fromEntries(searchParams.entries()) };

      if (title) {
        newParams.title = title;
      } else {
        delete newParams.title;
      }

      if (city) {
        newParams.city = city;
      } else {
        delete newParams.city;
      }

      setSearchParams(newParams);
    }, 500);

    return () => clearTimeout(timer);
  }, [city, searchParams, setSearchParams, title]);

  const resetFilters = useCallback(() => {
    setTitle("");
    setCity("");
    setCategory("All");

    setSearchParams({});
  }, [setSearchParams]);

  const handleCategoryChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newCategory: EventCategoryType | "All") => {
      const newParams = { ...Object.fromEntries(searchParams.entries()) };

      if (!newCategory || newCategory === "All") {
        delete newParams.category;
      } else {
        newParams.category = newCategory;
      }

      setSearchParams(newParams);
      setCategory(newCategory);
    },
    [searchParams, setSearchParams],
  );

  const eventFilterInputConfig: FilterInputsConfig = useMemo(() => {
    return {
      inputs: [
        {
          inputType: InputType.Text,
          id: "titleFilter",
          label: eventTitleTexts.label,
          placeholder: eventTitleTexts.placeholder,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
          value: title,
        },
        {
          inputType: InputType.Text,
          id: "cityFilter",
          label: cityTexts.label,
          placeholder: cityTexts.placeholder,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value),
          value: city,
        },
        // {
        //   inputType: InputType.text,
        //   id: EventsPageIds.bandFilter,
        //   label: band.label,
        //   placeholder: band.placeholder,
        //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBand(e.target.value),
        //   value: currentBand,
        // },
      ],
      buttons: [
        {
          id: "resetButton",
          disabled: false,
          label: buttons.reset.label,
          color: "primary",
          size: "medium",
          variant: "outlined",
          onClick: resetFilters,
        },
      ],
    };
  }, [title, city, resetFilters]);

  const eventFilterToggleButtons: ToggleButtonFilterProps = useMemo(() => {
    return {
      inputType: InputType.ToggleButton,
      id: "categoryToggleButtons",
      label: "Event Type",
      value: category,
      options: eventCategoriesList,
      onChange: handleCategoryChange,
    };
  }, [category, handleCategoryChange]);

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
};
