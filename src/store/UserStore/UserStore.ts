import { makeAutoObservable } from "mobx";

import type { UserProfile } from "../../common/types/userTypes";

class UserStore {
  userProfile: UserProfile | null = null;
  isAuthLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuthenticated(): boolean {
    return !!this.userProfile;
  }

  setUserProfile = (userProfile: UserProfile | null) => {
    this.userProfile = userProfile;
  };
}

export default UserStore;
