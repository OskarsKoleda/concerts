import { makeAutoObservable } from "mobx";
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

  get eventPosterTitle(): string | undefined {
    return this.posterTitle || this.event?.posterImageTitle;
  }

  get openedEventId(): string {
    return this.eventId;
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

  resetEvent = (): void => {
    this.event = null;
  };
}
