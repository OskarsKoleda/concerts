export type CreateUserRequest = Omit<UserProfile, "id"> & {
  password: string;
};

export type AuthenticateUserRequest = Pick<UserProfile, "email"> & {
  password: string;
};

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
}
