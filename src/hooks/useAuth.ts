import { useEffect } from "react";

import { useGetCurrentUser } from "../api/user/useGetCurrentUser";
import { useRootStore } from "../store/StoreContext";

const useAuth = () => {
  const { setUserProfile } = useRootStore().userStore;
  const { data: user, isLoading, isError } = useGetCurrentUser();

  useEffect(() => {
    if (user) {
      setUserProfile(user);
    } else if (isError || !user) {
      setUserProfile(null);
    }
  }, [user, isError, setUserProfile]);

  return {
    isLoading,
    isAuthenticated: !!user,
    user,
  };
};

export default useAuth;
