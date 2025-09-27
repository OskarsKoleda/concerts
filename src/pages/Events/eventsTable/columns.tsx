import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FestivalIcon from "@mui/icons-material/Festival";
import MicIcon from "@mui/icons-material/Mic";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { Box, Tooltip } from "@mui/material";

import { EventCategory } from "../../../common/enums/appEnums.ts";
import { formatDateToDefault } from "../../../common/utils/utils.ts";

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
    default:
      throw new Error(
        `Unknown event category: ${params.value}. Expected one of: MusicConcert, MusicFestival, Theatre, CreativeEvening`,
      );
  }
};

const renderBandsCell = (params: GridRenderCellParams) => {
  if (!params.value) {
    return "-";
  }

  return (
    <Tooltip title={params.value.join(", ")}>
      <span>{params.value.join(", ")}</span>
    </Tooltip>
  );
};

const renderDateCell = (params: GridRenderCellParams) => {
  if (!params.value) {
    return <span>-</span>;
  }

  return <span>{formatDateToDefault(params.value)}</span>;
};

const renderTicketPriceCell = (params: GridRenderCellParams) => {
  return <span>{params.value}</span>;
};

export const columns: GridColDef[] = [
  {
    field: "category",
    headerName: "Event Type",
    disableColumnMenu: true,
    renderCell: renderEventCategoryCell,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "bands",
    headerName: "Bands",
    width: 260,
    renderCell: renderBandsCell,
    sortable: false,
  },
  {
    field: "city",
    headerName: "City",
  },
  {
    field: "date",
    headerName: "Date",
    renderCell: renderDateCell,
  },
  {
    field: "endDate",
    headerName: "End Date",
    renderCell: renderDateCell,
  },
  {
    field: "ticketPrice",
    headerName: "Ticket (€)",
    renderCell: renderTicketPriceCell,
    sortComparator: (a: number, b: number) => a - b,
  },
];
