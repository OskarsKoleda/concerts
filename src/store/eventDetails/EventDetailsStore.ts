import { makeAutoObservable } from "mobx";

import type { LocalEventData, ServerEventData } from "../../common/types/eventTypes.ts";
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

  constructor(eventDetailsTransport: EventDetailsTransport) {
    makeAutoObservable(this);
    this.eventDetailsTransport = eventDetailsTransport;
    this.eventId = "";
  }

  public get currentEventId(): string {
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

  private uploadPosterImage = async (posterImage: FileList): Promise<ImageUploadData> => {
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

  public deleteEvent = async (id: string): Promise<EventDeleteResult> => {
    return this.eventDetailsTransport.deleteEvent(id);
  };
}
