import { makeAutoObservable } from "mobx";

import type { LocalUserProfile } from "../../common/types/eventTypes.ts";

export class UserStore {
  userProfile: LocalUserProfile | null = null;
  isAuthLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }
}
