import { child, type Database, get, push, ref, remove, set, update } from "firebase/database";
import { makeAutoObservable } from "mobx";

import { getRequestContext } from "../rootTransport/utils";

import { EventDetailsRequests, requestErrorMessages } from "./constants";

import type { ServerEventData } from "../../../common/types/eventTypes.ts";
import type { RequestHandler } from "../requestHandler/RequestHandler";
import type { ChildTransport, RequestContext } from "../rootTransport/types";
import type { FirebaseResponse } from "../../responseTypes.ts";

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

  addEvent = async (event: ServerEventData): Promise<FirebaseResponse> => {
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

  updateEvent = async (eventId: string, eventData: ServerEventData): Promise<FirebaseResponse> => {
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

  deleteEvent = async (eventId: string): Promise<FirebaseResponse> => {
    const { errorTexts, request } = this.getRequestContextHelper(EventDetailsRequests.deleteEvent);
    if (!eventId) {
      return;
    }

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
