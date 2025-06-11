import type { User, UserCredential } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { makeAutoObservable } from "mobx";
import type { AuthUserProfile, LocalUserProfile } from "../../common/types/eventTypes.ts";
import { auth } from "../../initializeFirebase.ts";
import type { AuthTransport } from "../transport/authTransport/AuthTransport.ts";
import type { UserTransport } from "../transport/userTransport/UserTransport.ts";

export class UserStore {
  userTransport: UserTransport;
  authTransport: AuthTransport;
  userProfile: LocalUserProfile | null;

  constructor(authTransport: AuthTransport, userTransport: UserTransport) {
    makeAutoObservable(this);
    this.listenForAuthChanges();
    this.authTransport = authTransport;
    this.userTransport = userTransport;
    this.userProfile = null;
  }

  listenForAuthChanges() {
    onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        this.userProfile = null;

        return;
      }

      const userProfileData = await this.userTransport.getUser(user.uid);

      if (userProfileData) {
        this.userProfile = {
          uid: userProfileData.uid,
          email: userProfileData.email,
          username: userProfileData.username,
        };
      }
    });
  }

  public createUser = async (user: AuthUserProfile): Promise<string | undefined> => {
    const response = await this.authTransport.signUp(user);

    if (!response) {
      throw new Error("Signup failed!");
    }

    const userDataWithoutPassword: LocalUserProfile = {
      uid: response.user.uid,
      username: user.username,
      email: user.email,
    };

    const createdUser = await this.userTransport.createUser(userDataWithoutPassword);

    if (!createdUser) {
      await this.authTransport.deleteUser();
      throw new Error("User profile creation failed. Rolling back sign-up.");
    }

    return createdUser;
  };

  public loginUser = async (user: AuthUserProfile): Promise<UserCredential | undefined> => {
    const response = await this.authTransport.login(user);

    if (!response) {
      throw new Error("Login failed!");
    }

    const userProfileData = await this.userTransport.getUser(response.user.uid);

    if (userProfileData) {
      this.userProfile = {
        uid: userProfileData.uid,
        email: userProfileData.email,
        username: userProfileData.username,
      };
    }

    return response;
  };

  public logoutUser = async (): Promise<void> => {
    await this.authTransport.logout();
  };
}
