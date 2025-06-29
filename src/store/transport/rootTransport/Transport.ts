import { makeAutoObservable } from "mobx";

import { auth, db } from "../../../initializeFirebase.ts";
import { AppState } from "../appState/AppState";
import { AuthTransport } from "../authTransport/AuthTransport.ts";
import { CloudinaryTransport } from "../cloudinaryTransport/CloudinaryTransport.ts";
import { EventDetailsTransport } from "../eventDetailsTransport/EventDetailsTransport.ts";
import { EventListTransport } from "../eventListTransport/EventListTransport.ts";
import { RequestHandler } from "../requestHandler/RequestHandler";
import { UserTransport } from "../userTransport/UserTransport.ts";

import type { RootTransport } from "./types";

export class Transport implements RootTransport {
  public readonly appState: AppState;
  public readonly requestHandler: RequestHandler;
  public readonly eventListTransport: EventListTransport;
  public readonly eventDetailsTransport: EventDetailsTransport;
  public readonly cloudinaryTransport: CloudinaryTransport;
  public readonly authTransport: AuthTransport;
  public readonly userTransport: UserTransport;

  constructor() {
    makeAutoObservable(this);

    // what is this?
    this.appState = new AppState();

    this.requestHandler = new RequestHandler({
      setAppActiveError: this.appState.setActiveError,
    });

    this.eventListTransport = new EventListTransport(db, this.requestHandler);
    this.eventDetailsTransport = new EventDetailsTransport(db, this.requestHandler);
    this.cloudinaryTransport = new CloudinaryTransport(this.requestHandler);
    this.authTransport = new AuthTransport(auth, this.requestHandler);
    this.userTransport = new UserTransport(db, this.requestHandler);
  }
}
