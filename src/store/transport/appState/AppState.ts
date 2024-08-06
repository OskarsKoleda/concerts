import { makeAutoObservable } from "mobx";

import type { AppStateStorage, SetAppActiveError } from "./types";

export class AppState implements AppStateStorage {
  public activeError = { message: "" };

  constructor() {
    makeAutoObservable(this);
  }
  public setActiveError: SetAppActiveError = (message) => {
    this.activeError = { message };
  };
}
