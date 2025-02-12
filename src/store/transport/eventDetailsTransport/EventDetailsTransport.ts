import { child, type Database, get, push, ref, remove, set, update } from "firebase/database";
import { makeAutoObservable } from "mobx";
import { getRequestContext } from "../rootTransport/utils";
import type { ServerEventData } from "../../../common/types/eventTypes.ts";
import type {
  EventCreateResult,
  EventDeleteResult,
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

      return createdEventReference.key;
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };

  uploadImageToCloudinary = async (
    posterImage: FileList,
  ): Promise<ImageUploadResult | undefined> => {
    const { errorTexts, request } = this.getRequestContextHelper(EventDetailsRequests.uploadPoster);
    const formData = new FormData();

    formData.append("file", posterImage[0]);
    formData.append("upload_preset", "events");

    try {
      request.inProgress();
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      return {
        publicPosterImageId: data.public_id,
        posterImageUrl: data.secure_url,
      };
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };

  getEvent = async (eventId: string): Promise<ServerEventData | undefined> => {
    const { errorTexts, request } = this.getRequestContextHelper(EventDetailsRequests.getEvent);

    try {
      request.inProgress();
      const snapshot = await get(child(ref(this.db), `/events/${eventId}`));

      request.success();

      return snapshot.val();
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };

  updateEvent = async (eventId: string, eventData: ServerEventData): Promise<EventUpdateResult> => {
    const { errorTexts, request } = this.getRequestContextHelper(EventDetailsRequests.updateEvent);

    try {
      request.inProgress();
      const eventReference = ref(this.db, `/events/${eventId}`);
      await update(eventReference, eventData);
      request.success();

      return eventReference.key;
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };

  deleteEvent = async (eventId: string): Promise<EventDeleteResult> => {
    const { errorTexts, request } = this.getRequestContextHelper(EventDetailsRequests.deleteEvent);
    const eventReference = ref(this.db, `/events/${eventId}`);

    try {
      request.inProgress();
      await remove(eventReference);
      request.success();

      return eventReference.key;
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };
}
