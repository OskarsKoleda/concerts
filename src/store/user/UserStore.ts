import { makeAutoObservable } from "mobx";

import type { UserProfile } from "../../common/types/userTypes";

class UserStore {
  userProfile: UserProfile | null = null;
  isAuthLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  setUserProfile(userProfile: UserProfile) {
    this.userProfile = userProfile;
  }
}

export default UserStore;
