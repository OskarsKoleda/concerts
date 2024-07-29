import { makeAutoObservable } from "mobx";
import { ConcertTransport } from "../concertTransport/ConcertTransport";
import type { RootTransport } from "./types";
import { RequestHandler } from "../requestHandler/RequestHandler";
import { AppState } from "../appState/AppState";
import { db } from "../../../firebaseConfig";

export class Transport implements RootTransport {
  public readonly appState: AppState;

  public readonly requestHandler: RequestHandler;

  public readonly concertTransport: ConcertTransport;

  constructor() {
    makeAutoObservable(this);

    // what is this?
    this.appState = new AppState();

    this.requestHandler = new RequestHandler({
      setAppActiveError: this.appState.setActiveError,
    });

    this.concertTransport = new ConcertTransport(db, this.requestHandler);
  }
}
