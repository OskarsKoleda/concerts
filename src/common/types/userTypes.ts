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

export interface UserStats {
  totalVisits: number;
  totalSpent: number;
  avgSpent: number;
  maxSpent: number;
  minSpent: number;
  uniqueBandsSeenCount: number;
  uniqueCitiesSeenCount: number;
  uniqueVenuesSeenCount: number;
  categoryCounts: Record<string, number>;
  bandCounts: Record<string, number>;
  cityCounts: Record<string, number>;
  venueCounts: Record<string, number>;
  yearCounts: Record<string, number>;
}
