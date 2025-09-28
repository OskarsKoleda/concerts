export type CreateUserRequest = Omit<UserProfile, "id"> & {
  password: string;
};

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
}
