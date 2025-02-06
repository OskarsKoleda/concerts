import { makeAutoObservable } from "mobx";

import { AppState } from "../appState/AppState";
import { EventDetailsTransport } from "../eventDetailsTransport/EventDetailsTransport.ts";
import { EventListTransport } from "../eventListTransport/EventListTransport.ts";
import { RequestHandler } from "../requestHandler/RequestHandler";
import { db } from "../../../firebaseConfig.ts";

import type { RootTransport } from "./types";

export class Transport implements RootTransport {
  public readonly appState: AppState;
  public readonly requestHandler: RequestHandler;
  public readonly eventListTransport: EventListTransport;
  public readonly eventDetailsTransport: EventDetailsTransport;

  constructor() {
    makeAutoObservable(this);

    // what is this?
    this.appState = new AppState();

    this.requestHandler = new RequestHandler({
      setAppActiveError: this.appState.setActiveError,
    });

    this.eventListTransport = new EventListTransport(db, this.requestHandler);
    this.eventDetailsTransport = new EventDetailsTransport(db, this.requestHandler);
  }
}
