import { child, type Database, get, push, ref, remove, set, update } from "firebase/database";
import { makeAutoObservable } from "mobx";
import { ResponseMessages } from "../../../common/constants/appConstant";
import { getRequestContext } from "../rootTransport/utils";
import type { ServerEventData } from "../../../common/types/eventTypes.ts";
import type {
  EventCreateResult,
  EventDeleteResult,
  EventReadResult,
  EventUpdateResult,
  ImageUploadResult,
} from "../responseTypes.ts";
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

  addEvent = async (event: ServerEventData): Promise<EventCreateResult> => {
    const { errorTexts, request } = this.getRequestContextHelper(EventDetailsRequests.addEvent);

    try {
      request.inProgress();
      const createdEventReference = push(ref(this.db, `/events`));

      await set(createdEventReference, event);
      request.success();

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
  uploadImageToCloudinary = async (posterImage: FileList): Promise<ImageUploadResult> => {
    const formData = new FormData();
    formData.append("file", posterImage[0]);
    formData.append("upload_preset", "events");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/uploadx`,
        {
          method: "POST",
          body: formData,
        },
      );
    } catch (error) {}

    // if (!response.ok) {
    //   return {
    //     message: "Failed to upload image", // TODO: move to error messages
    //   };
    // }

    const data = await response.json();

    return {
      publicPosterImageId: data.public_id,
      posterImageUrl: data.secure_url,
    };
  };

  getEvent = async (eventId: string): Promise<EventReadResult> => {
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

  updateEvent = async (eventId: string, eventData: ServerEventData): Promise<EventUpdateResult> => {
    const { errorTexts, request } = this.getRequestContextHelper(EventDetailsRequests.updateEvent);

    try {
      request.inProgress();
      const eventReference = ref(this.db, `/events/${eventId}`);
      await update(eventReference, eventData);
      request.success();

      return { eventReference: eventId };
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);

      return { message: ResponseMessages.EVENT_UPDATE_FAILURE };
    }
  };

  deleteEvent = async (eventId: string): Promise<EventDeleteResult> => {
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
