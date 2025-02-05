import { makeAutoObservable } from "mobx";

import { AppState } from "../appState/AppState";
import { EventDetailsTransport } from "../eventDetailsTransport/EventDetailsTransport.ts";
import { ConcertListTransport } from "../concertListTransport/ConcertListTransport";
import { RequestHandler } from "../requestHandler/RequestHandler";
import { db } from "../../../firebaseConfig.ts";

import type { RootTransport } from "./types";

export class Transport implements RootTransport {
  public readonly appState: AppState;
  public readonly requestHandler: RequestHandler;
  public readonly concertListTransport: ConcertListTransport;
  public readonly concertDetailsTransport: EventDetailsTransport;

  constructor() {
    makeAutoObservable(this);

    // what is this?
    this.appState = new AppState();

    this.requestHandler = new RequestHandler({
      setAppActiveError: this.appState.setActiveError,
    });

    this.concertListTransport = new ConcertListTransport(db, this.requestHandler);
    this.concertDetailsTransport = new EventDetailsTransport(db, this.requestHandler);
  }
}
