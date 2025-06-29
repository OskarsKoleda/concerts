import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { makeAutoObservable } from "mobx";

import type { AuthUserProfile, LocalUserProfile } from "../../common/types/eventTypes.ts";
import { auth } from "../../initializeFirebase.ts";
import type { FirebaseResponse } from "../responseTypes.ts";
import type { AuthTransport } from "../transport/authTransport/AuthTransport.ts";
import { FirebaseAuthRequests } from "../transport/authTransport/constants.ts";
import { UserRequests } from "../transport/userTransport/constants.ts";
import type { UserTransport } from "../transport/userTransport/UserTransport.ts";

export class UserStore {
  userProfile: LocalUserProfile | null = null;
  isAuthLoading: boolean = true;
  private unsubscribeAuth: (() => void) | null = null;

  constructor(
    private readonly authTransport: AuthTransport,
    private readonly userTransport: UserTransport,
  ) {
    makeAutoObservable(this);
  }

  get isLoginInProgress(): boolean {
    return (
      this.userTransport.requestHandler.isProcessingRequest(UserRequests.getUser) ||
      this.authTransport.requestHandler.isProcessingRequest(FirebaseAuthRequests.login)
    );
  }

  get isSignUpInProgress(): boolean {
    return (
      this.userTransport.requestHandler.isProcessingRequest(UserRequests.createUser) ||
      this.authTransport.requestHandler.isProcessingRequest(FirebaseAuthRequests.signUp)
    );
  }

  createUser = async (user: AuthUserProfile): Promise<FirebaseResponse> => {
    const response = await this.authTransport.signUp(user);

    if (!response) {
      throw new Error("Signup failed!");
    }

    const userData: LocalUserProfile = {
      uid: response.user.uid,
      email: user.email,
      username: user.username,
    };

    const createdUser = await this.userTransport.createUser(userData);

    if (!createdUser) {
      await this.authTransport.deleteUser();
      throw new Error("User profile creation failed. Rolling back sign-up.");
    }

    this.setUserProfile(userData);

    return createdUser;
  };

  loginUser = async (user: AuthUserProfile): Promise<string | undefined> => {
    const response = await this.authTransport.login(user);

    if (!response) {
      throw new Error("Login failed!");
    }

    const userData = await this.userTransport.getUser(response.user.uid);

    if (userData) {
      this.setUserProfile(userData);

      return userData.username;
    }
  };

  logoutUser = async (): Promise<void> => {
    await this.authTransport.logout();
  };

  listenForAuthChanges() {
    this.unsubscribeAuth = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        this.userProfile = null;
        this.isAuthLoading = false;

        return;
      }

      const userData = await this.userTransport.getUser(user.uid);

      if (userData) {
        this.setUserProfile(userData);
      }

      this.isAuthLoading = false;
    });
  }

  dispose() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
      this.unsubscribeAuth = null;
    }
  }

  private setUserProfile(userProfile: LocalUserProfile) {
    this.userProfile = userProfile;
  }
}
