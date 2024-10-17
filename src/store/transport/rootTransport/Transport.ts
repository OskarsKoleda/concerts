import { makeAutoObservable } from "mobx";

import { db } from "../../../firebaseConfig";
import { AppState } from "../appState/AppState";
import { ConcertDetailsTransport } from "../concertDetailsTransport/ConcertDetailsTransport";
import { ConcertListTransport } from "../concertListTransport/ConcertListTransport";
import { RequestHandler } from "../requestHandler/RequestHandler";

import type { RootTransport } from "./types";

export class Transport implements RootTransport {
  public readonly appState: AppState;
  public readonly requestHandler: RequestHandler;
  public readonly concertListTransport: ConcertListTransport;
  public readonly concertDetailsTransport: ConcertDetailsTransport;

  constructor() {
    makeAutoObservable(this);

    // what is this?
    this.appState = new AppState();

    this.requestHandler = new RequestHandler({
      setAppActiveError: this.appState.setActiveError,
    });

    this.concertListTransport = new ConcertListTransport(db, this.requestHandler);
    this.concertDetailsTransport = new ConcertDetailsTransport(db, this.requestHandler);
  }
}
