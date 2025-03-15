import { makeAutoObservable } from "mobx";
import type { ServerEventData } from "../../../common/types/eventTypes.ts";
import { formatDate } from "../../../common/utils/utility.ts";

export class EventDetailsUIStore {
  private event: ServerEventData | null;
  private eventId: string;
  private posterTitle: string;

  constructor() {
    makeAutoObservable(this);
    this.event = null;
    this.eventId = "";
    this.posterTitle = "";
  }

  get currentEvent(): ServerEventData | null {
    return this.event;
  }

  get eventPosterTitle(): string | undefined {
    return this.posterTitle || this.event?.posterImageTitle;
  }

  get currentEventId(): string {
    return this.eventId;
  }

  get currentEventTitle(): string {
    return this.event?.eventTitle ?? "";
  }

  get currentEventCity(): string {
    return this.event?.city ?? "";
  }

  get currentEventLocation(): string {
    return this.event?.location ?? "";
  }

  get currentEventDate(): string {
    const date = this.event?.eventDate;

    return date ? formatDate(date) : "";
  }

  get currentFestivalEndDate(): string {
    const date = this.event?.festivalEndDate;

    return date ? formatDate(date) : "";
  }

  get currentFestivalTicketPrice(): string {
    return this.event?.ticketPrice ? `${this.event?.ticketPrice} €` : "";
  }

  get currentEventPosterURL(): string | undefined {
    return this.event?.posterImageUrl;
  }

  get currentEventPosterTitle(): string {
    return this.event?.posterImageTitle ?? "";
  }

  get currentEventArtists(): ServerEventData["artists"] {
    return this.event?.artists || [];
  }

  setEventId = (eventId: string): void => {
    this.eventId = eventId;
  };

  setEvent = (event: ServerEventData): void => {
    this.event = event;
  };

  setPosterTitle = (posterTitle: string): void => {
    this.posterTitle = posterTitle;
  };

  resetCurrentEvent = (): void => {
    this.event = null;
    this.eventId = "";
    this.posterTitle = "";
  };
}
