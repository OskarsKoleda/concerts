import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import posterMissing from "../../../assets/poster-missing.jpg";
import Card from "../../../components/Card/Card";
import { ROUTES } from "../../../router/routes";
import EventHeader from "./EventHeader/EventHeader";
import EventBands from "./EventBands/EventBands";
import EventFooter from "./EventFooter/EventFooter";

import type { ServerEventData } from "../../../common/types/eventTypes";

interface EventCardProps {
  event: ServerEventData;
}

const EventCard = ({ event }: EventCardProps) => {
  const { title, bands, url, slug } = event;

  const navigate = useNavigate();
  const openEventDetails = useCallback(() => {
    navigate(`${ROUTES.EVENTS}/${slug}`);
  }, [navigate, slug]);

  return (
    <Card
      imageUrl={url || posterMissing}
      imageTitle={url ? title : "poster-is-missing"}
      cardActionButtonTitle="View"
      onCardActionClick={openEventDetails}
      header={<EventHeader event={event} />}
      body={<EventBands bands={bands} />}
      footer={<EventFooter event={event} />}
    />
  );
};

export default EventCard;
