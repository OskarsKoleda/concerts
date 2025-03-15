import { Box, Tooltip } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

import FestivalIcon from "@mui/icons-material/Festival";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { EventCategory } from "../../../../common/enums/appEnums.ts";
import { formatDate } from "../../../../common/utils/utility.ts";
import { eventCardIconContainerStyles } from "./styles.ts";

const renderEventCategoryCell = (params: GridRenderCellParams) => {
  switch (params.value) {
    case EventCategory.musicConcert:
      return (
        <Tooltip title="Music Concert">
          <Box sx={eventCardIconContainerStyles}>
            <MicIcon />
          </Box>
        </Tooltip>
      );
    case EventCategory.musicFestival:
      return (
        <Tooltip title="Music Festival">
          <Box sx={eventCardIconContainerStyles}>
            <FestivalIcon />
          </Box>
        </Tooltip>
      );

    case EventCategory.theatre:
      return (
        <Tooltip title="Theatre">
          <Box sx={eventCardIconContainerStyles}>
            <TheaterComedyIcon />
          </Box>
        </Tooltip>
      );

    case EventCategory.creativeEvening:
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

  return <span>{formatDate(params.value)}</span>;
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
