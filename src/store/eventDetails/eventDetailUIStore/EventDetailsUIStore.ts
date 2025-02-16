import { makeAutoObservable, observable, runInAction } from "mobx";
import type { ServerEventData } from "../../../common/types/eventTypes.ts";

export class EventDetailsUIStore {
  private event: ServerEventData | null;
  private eventId: string;

  constructor() {
    makeAutoObservable(this);
    this.event = null;
    this.eventId = "";
  }

  setEventId = (eventId: string): void => {
    this.eventId = eventId;
  };

  setEvent = (event: ServerEventData): void => {
    runInAction(() => {
      this.event = observable(event); // Wrap event as observable
    });
  };

  get eventPosterName(): string {
    return this.event?.posterImageTitle ?? "";
  }

  get openedEventId(): string {
    return this.eventId;
  }
}
