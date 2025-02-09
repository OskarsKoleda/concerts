import { makeAutoObservable } from "mobx";

import type { LocalEventData } from "../../common/types/eventTypes.ts";
import type { EventDetailsTransport } from "../transport/eventDetailsTransport/EventDetailsTransport.ts";
import type { EventDeleteResult, ImageUploadResult } from "../transport/responseTypes.ts";
import type {
  EventCreateData,
  EventRetrieveData,
  EventUpdateStatus,
  ImageUploadData,
} from "../responseTypes.ts";
import { ResponseMessages } from "../../common/constants/appConstant.ts";

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

  public getEvent = async (eventId: string): Promise<EventRetrieveData> => {
    this.eventId = eventId;
    const response = await this.eventDetailsTransport.getEvent(eventId);

    if ("event" in response) {
      return {
        status: "OK",
        event: response.event,
        message: ResponseMessages.EVENT_SUCCESSFUL_UPDATE,
      };
    }

    return { status: "ERROR", message: response.message };
  };

  public addEvent = async (event: LocalEventData): Promise<EventCreateData> => {
    let imageUploadResult: ImageUploadResult | undefined;

    if (event.posterImage) {
      imageUploadResult = await this.uploadPosterImage(event.posterImage);
    }

    if (imageUploadResult && "message" in imageUploadResult) {
      return { status: "ERROR", message: imageUploadResult.message };
    }

    return this.createAndStoreEvent(
      event,
      imageUploadResult?.publicPosterImageId,
      imageUploadResult?.posterImageUrl,
    );
  };

  private uploadPosterImage = async (posterImage: File): Promise<ImageUploadData> => {
    const response: ImageUploadResult =
      await this.eventDetailsTransport.uploadImageToCloudinary(posterImage);

    if ("message" in response) {
      return { status: "ERROR", message: response.message };
    }

    return {
      status: "OK",
      posterImageUrl: response.posterImageUrl,
      publicPosterImageId: response.publicPosterImageId,
    };
  };

  private createAndStoreEvent = async (
    event: LocalEventData,
    publicPosterImageId?: string,
    posterImageUrl?: string,
  ): Promise<EventCreateData> => {
    const newEventData = this.composeEventData(event, posterImageUrl, publicPosterImageId);
    const eventCreationResponse = await this.eventDetailsTransport.addEvent(newEventData);

    if ("eventReference" in eventCreationResponse) {
      return {
        status: "OK",
        eventReference: eventCreationResponse.eventReference,
        message: "Event successfully added!",
      };
    }

    return { status: "ERROR", message: eventCreationResponse.message };
  };

  private composeEventData = (
    event: LocalEventData,
    posterImageUrl?: string,
    publicPosterImageId?: string,
  ) => {
    return {
      ...event,
      posterImageUrl: posterImageUrl ?? undefined,
      publicPosterImageId: publicPosterImageId ?? undefined,
      eventDate: event.eventDate?.toISOString() ?? undefined,
      festivalStartDate: event.festivalStartDate?.toISOString() ?? undefined,
      festivalEndDate: event.festivalEndDate?.toISOString() ?? undefined,
    };
  };

  public updateEvent = async (
    eventId: string,
    event: LocalEventData,
  ): Promise<EventUpdateStatus> => {
    let imageUploadResult: ImageUploadResult | undefined;

    if (event.posterImage) {
      imageUploadResult = await this.uploadPosterImage(event.posterImage);
    }

    if (imageUploadResult && "message" in imageUploadResult) {
      return { status: "ERROR", message: imageUploadResult.message };
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
  ): Promise<EventCreateData> => {
    const updatedEventData = this.composeEventData(event, posterImageUrl, publicPosterImageId);
    const eventUpdateResponse = await this.eventDetailsTransport.updateEvent(
      eventId,
      updatedEventData,
    );

    if ("eventReference" in eventUpdateResponse) {
      return {
        status: "OK",
        eventReference: eventUpdateResponse.eventReference,
        message: "Event successfully added!",
      };
    }

    return { status: "ERROR", message: eventUpdateResponse.message };
  };

  public deleteConcert = async (id: string): Promise<EventDeleteResult> => {
    return this.eventDetailsTransport.deleteConcert(id);
  };
}
