import { makeAutoObservable } from "mobx";

import type { LocalEventData } from "../../common/types/eventTypes.ts";
import type { EventDetailsTransport } from "../transport/eventDetailsTransport/EventDetailsTransport.ts";
import type {
  EventCreateResponse,
  EventDeleteResponse,
  EventReadResponse,
  EventUpdateResponse,
  ImageUploadResponse,
} from "../responseTypes.ts";

export class EventDetailsStore {
  eventId: string;
  eventDetailsTransport: EventDetailsTransport;

  constructor(concertDetailsTransport: EventDetailsTransport) {
    makeAutoObservable(this);
    this.eventDetailsTransport = concertDetailsTransport;
    this.eventId = "";
  }

  public get currentConcertId(): string {
    return this.eventId;
  }

  public getEvent = async (eventId: string): Promise<EventReadResponse> => {
    this.eventId = eventId;

    return this.eventDetailsTransport.getEvent(eventId);
  };

  public addEvent = async (event: LocalEventData): Promise<EventCreateResponse> => {
    const response: ImageUploadResponse = await this.eventDetailsTransport.uploadImageToCloudinary(
      event.posterImage,
    );

    if ("publicId" in response && "posterImageUrl" in response) {
      const newEventData = this.composeEventData(event, response);

      return await this.eventDetailsTransport.addEvent(newEventData);
    }

    return { message: response.message };
  };

  public updateEvent = async (
    eventId: string,
    event: LocalEventData,
  ): Promise<EventUpdateResponse> => {
    const response: ImageUploadResponse = await this.eventDetailsTransport.uploadImageToCloudinary(
      event.posterImage,
    );

    if ("publicId" in response && "posterImageUrl" in response) {
      const updatedEventData = this.composeEventData(event, response);

      return this.eventDetailsTransport.updateEvent(eventId, updatedEventData);
    }

    return { message: response.message };
  };

  public deleteConcert = async (id: string): Promise<EventDeleteResponse> => {
    return this.eventDetailsTransport.deleteConcert(id);
  };

  private composeEventData = (
    event: LocalEventData,
    cloudinaryResponse: Exclude<ImageUploadResponse, { message: string }>,
  ) => {
    return {
      ...event,
      posterUrl: cloudinaryResponse.posterImageUrl,
      posterPublicId: cloudinaryResponse.posterImageUrl,
      eventDate: event.eventDate?.toISOString() || undefined,
      festivalStartDate: event.festivalStartDate?.toISOString() || undefined,
      festivalEndDate: event.festivalEndDate?.toISOString() || undefined,
    };
  };
}
