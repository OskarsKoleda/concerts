import { child, type Database, get, push, ref, remove, set, update } from "firebase/database";
import { makeAutoObservable } from "mobx";
import { ResponseMessages } from "../../../common/constants/appConstant";
import { getRequestContext } from "../rootTransport/utils";
import type { ServerEventData } from "../../../common/types/eventTypes.ts";
import type {
  EventCreateResponse,
  EventDeleteResponse,
  EventReadResponse,
  EventUpdateResponse,
  ImageUploadResponse,
} from "../../responseTypes.ts";
import type { RequestHandler } from "../requestHandler/RequestHandler";
import type { ChildTransport, RequestContext } from "../rootTransport/types";
import { EventDetailsRequests, requestErrorMessages } from "./constants";

export class EventDetailsTransport implements ChildTransport {
  constructor(
    readonly db: Database,
    readonly requestHandler: RequestHandler,
  ) {
    makeAutoObservable(this);
  }

  private getRequestContextHelper = (requestName: EventDetailsRequests): RequestContext => {
    return getRequestContext(requestName, this.requestHandler, requestErrorMessages);
  };

  addEvent = async (event: ServerEventData): Promise<EventCreateResponse> => {
    const { errorTexts, request } = this.getRequestContextHelper(EventDetailsRequests.addEvent);

    try {
      request.inProgress();
      const createdEventReference = push(ref(this.db, `/events`));

      await set(createdEventReference, event);
      request.success();

      // TODO: check this ThenableReference object
      return {
        eventReference: createdEventReference.key,
      };
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);

      return {
        message: ResponseMessages.EVENT_FAILED_CREATION,
      };
    }
  };

  // TODO: move to its own transport?
  // TODO: add try / catch
  uploadImageToCloudinary = async (posterImage: File): Promise<ImageUploadResponse> => {
    const formData = new FormData();
    formData.append("file", posterImage);
    formData.append("upload_preset", "events");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      return {
        message: "Failed to upload image", // TODO: move to error messages
      };
    }

    const data = await response.json();

    return {
      publicId: data.publicId,
      posterImageUrl: data.secure_url,
    };
  };

  getEvent = async (eventId: string): Promise<EventReadResponse> => {
    const { errorTexts, request } = this.getRequestContextHelper(EventDetailsRequests.getEvent);

    try {
      request.inProgress();
      const snapshot = await get(child(ref(this.db), `/events/${eventId}`));

      if (!snapshot.exists()) {
        return { message: ResponseMessages.EVENT_NOT_FOUND };
      }

      request.success();

      return { event: snapshot.val() };
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);

      return { message: ResponseMessages.EVENT_FAILED_RETRIEVE };
    }
  };

  updateEvent = async (
    eventId: string,
    eventData: ServerEventData,
  ): Promise<EventUpdateResponse> => {
    const { errorTexts, request } = this.getRequestContextHelper(EventDetailsRequests.updateEvent);

    try {
      request.inProgress();
      const eventReference = ref(this.db, `/events/${eventId}`);
      await update(eventReference, eventData);
      request.success();

      return { eventId };
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);

      return { message: ResponseMessages.EVENT_UPDATE_FAILURE };
    }
  };

  deleteConcert = async (eventId: string): Promise<EventDeleteResponse> => {
    const { errorTexts, request } = this.getRequestContextHelper(EventDetailsRequests.deleteEvent);
    const concertRef = ref(this.db, `/events/${eventId}`);
    request.inProgress();

    try {
      request.inProgress();
      await remove(concertRef);
      request.success();

      return { success: true };
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);

      return { message: ResponseMessages.EVENT_DELETION_FAILURE };
    }
  };
}
