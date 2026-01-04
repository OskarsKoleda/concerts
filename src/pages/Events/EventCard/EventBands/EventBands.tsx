import { Chip } from "@mui/material";

import { chipStyles } from "../styles";

import type { ServerEventData } from "../../../../common/types/eventTypes";

interface EventBandsProps {
  bands: ServerEventData["bands"];
}

const EventBands = ({ bands }: EventBandsProps) => {
  if (!bands || bands.length === 0) {
    return null;
  }

  return (
    <>
      {bands.map((band) => (
        <Chip key={band} label={band} size="small" sx={chipStyles} />
      ))}
    </>
  );
};

export default EventBands;
