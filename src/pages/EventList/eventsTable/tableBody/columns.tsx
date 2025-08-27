import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FestivalIcon from "@mui/icons-material/Festival";
import MicIcon from "@mui/icons-material/Mic";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { Box, Tooltip } from "@mui/material";

import { EventCategory } from "../../../../common/enums/appEnums.ts";
import { formatDateToDefault } from "../../../../common/utils/utils.ts";

import { eventCardIconContainerStyles } from "./styles.ts";

import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

const renderEventCategoryCell = (params: GridRenderCellParams) => {
  switch (params.value) {
    case EventCategory.MusicConcert:
      return (
        <Tooltip title="Music Concert">
          <Box sx={eventCardIconContainerStyles}>
            <MicIcon />
          </Box>
        </Tooltip>
      );
    case EventCategory.MusicFestival:
      return (
        <Tooltip title="Music Festival">
          <Box sx={eventCardIconContainerStyles}>
            <FestivalIcon />
          </Box>
        </Tooltip>
      );

    case EventCategory.Theatre:
      return (
        <Tooltip title="Theatre">
          <Box sx={eventCardIconContainerStyles}>
            <TheaterComedyIcon />
          </Box>
        </Tooltip>
      );

    case EventCategory.CreativeEvening:
      return (
        <Tooltip title="Creative Evening">
          <Box sx={eventCardIconContainerStyles}>
            <AutoStoriesIcon />
          </Box>
        </Tooltip>
      );
  }
};

const renderArtistsCell = (params: GridRenderCellParams) => {
  if (!params.value) return "-";

  return (
    <Tooltip title={params.value.join(", ")}>
      <span>{params.value.join(", ")}</span>
    </Tooltip>
  );
};

const renderDateCell = (params: GridRenderCellParams) => {
  if (!params.value) return <span>-</span>;

  return <span>{formatDateToDefault(params.value)}</span>;
};

const renderTicketPriceCell = (params: GridRenderCellParams) => {
  return +params.value;
};

export const columns: GridColDef[] = [
  {
    field: "eventCategory",
    headerName: "Event Type",
    disableColumnMenu: true,
    width: 120,
    renderCell: renderEventCategoryCell,
  },
  {
    field: "eventTitle",
    headerName: "Title",
    flex: 1,
  },
  {
    field: "artists",
    headerName: "Artists",
    flex: 1,
    renderCell: renderArtistsCell,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "eventDate",
    headerName: "Date",
    width: 150,
    renderCell: renderDateCell,
  },
  {
    field: "festivalEndDate",
    headerName: "End Date",
    width: 150,
    renderCell: renderDateCell,
  },
  {
    field: "ticketPrice",
    headerName: "Ticket (€)",
    width: 100,
    renderCell: renderTicketPriceCell,
    sortComparator: (a: string, b: string) => +a - +b,
  },
];
