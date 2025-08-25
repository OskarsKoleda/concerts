import { makeAutoObservable } from "mobx";

import { formatDateToDefault } from "../../../common/utils/utils.ts";

import type { ServerEventData } from "../../../common/types/eventTypes.ts";

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
    return this.event?.title ?? "";
  }

  get currentEventCity(): string {
    return this.event?.city ?? "";
  }

  get currentEventLocation(): string {
    return this.event?.location ?? "";
  }

  get currentEventDate(): string {
    const date = this.event?.date;

    return date ? formatDateToDefault(date) : "";
  }

  get currentFestivalEndDate(): string {
    const date = this.event?.endDate;

    return date ? formatDateToDefault(date) : "";
  }

  get currentFestivalTicketPrice(): string {
    return this.event?.ticketPrice ? `${this.event?.ticketPrice} €` : "";
  }

  get currentEventPosterURL(): string | undefined {
    return this.event?.url;
  }

  get currentEventPosterTitle(): string {
    return this.event?.posterImageTitle ?? "";
  }

  get currentEventArtists(): ServerEventData["bands"] {
    return this.event?.bands || [];
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
