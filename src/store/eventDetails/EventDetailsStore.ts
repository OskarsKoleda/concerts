import { makeAutoObservable } from "mobx";

import type { LocalEventData, ServerEventData } from "../../common/types/eventTypes.ts";
import type { EventDetailsTransport } from "../transport/eventDetailsTransport/EventDetailsTransport.ts";
import type { EventCreateResult, EventDeleteResult } from "../transport/responseTypes.ts";
import type { ImageUploadData } from "../responseTypes.ts";
import type { Nullable } from "../../common/types/appTypes.ts";

export class EventDetailsStore {
  eventId: string;
  eventDetailsTransport: EventDetailsTransport;

  constructor(eventDetailsTransport: EventDetailsTransport) {
    makeAutoObservable(this);
    this.eventDetailsTransport = eventDetailsTransport;
    this.eventId = "";
  }

  public get currentEventId(): string {
    return this.eventId;
  }

  public getEvent = async (eventId: string): Promise<ServerEventData | undefined> => {
    this.eventId = eventId;
    const response = await this.eventDetailsTransport.getEvent(eventId);

    if (response) {
      return response;
    }
  };

  public addEvent = async (event: LocalEventData): Promise<EventCreateResult> => {
    const imageUploadResult = event.posterImage
      ? await this.uploadPosterImage(event.posterImage)
      : undefined;

    if (event.posterImage && !imageUploadResult) {
      return;
    }

    return this.createAndStoreEvent(
      event,
      imageUploadResult?.publicPosterImageId,
      imageUploadResult?.posterImageUrl,
    );
  };

  private uploadPosterImage = async (
    posterImage: FileList,
  ): Promise<ImageUploadData | undefined> => {
    const response = await this.eventDetailsTransport.uploadImageToCloudinary(posterImage);

    if (!response) {
      return;
    }

    return {
      posterImageUrl: response.posterImageUrl,
      publicPosterImageId: response.publicPosterImageId,
    };
  };

  private createAndStoreEvent = async (
    event: LocalEventData,
    publicPosterImageId?: string,
    posterImageUrl?: string,
  ): Promise<Nullable<string> | undefined> => {
    const newEventData = this.composeEventData(event, posterImageUrl, publicPosterImageId);

    return await this.eventDetailsTransport.addEvent(newEventData);
  };

  private composeEventData = (
    event: LocalEventData,
    posterImageUrl?: string,
    publicPosterImageId?: string,
  ): ServerEventData => {
    const eventData: ServerEventData = {
      ...event,
      posterImageUrl: posterImageUrl,
      publicPosterImageId: publicPosterImageId,
      eventDate: event.eventDate?.toISOString(),
      festivalStartDate: event.festivalStartDate?.toISOString(),
      festivalEndDate: event.festivalEndDate?.toISOString(),
    };

    return Object.fromEntries(
      Object.entries(eventData).filter(
        ([key, value]) => value !== undefined && key !== "posterImage",
      ),
    ) as ServerEventData;
  };

  public updateEvent = async (
    eventId: string,
    event: LocalEventData,
  ): Promise<EventCreateResult> => {
    const imageUploadResult = event.posterImage
      ? await this.uploadPosterImage(event.posterImage)
      : undefined;

    if (event.posterImage && !imageUploadResult) {
      return;
    }

    return this.updateAndStoreEvent(
      event,
      eventId,
      imageUploadResult?.publicPosterImageId,
      imageUploadResult?.posterImageUrl,
    );
  };

  private updateAndStoreEvent = async (
    event: LocalEventData,
    eventId: string,
    publicPosterImageId?: string,
    posterImageUrl?: string,
  ): Promise<EventCreateResult> => {
    const updatedEventData = this.composeEventData(event, posterImageUrl, publicPosterImageId);

    return await this.eventDetailsTransport.updateEvent(eventId, updatedEventData);
  };

  public deleteEvent = async (id: string): Promise<EventDeleteResult> => {
    return this.eventDetailsTransport.deleteEvent(id);
  };
}
