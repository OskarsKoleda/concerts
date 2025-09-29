import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGetCurrentUser } from "../api/user/useGetCurrentUser";
import { ROUTES } from "../router/routes";
import { useRootStore } from "../store/StoreContext";

const useAuth = () => {
  const navigate = useNavigate();
  const { setUserProfile } = useRootStore().userStore;
  const { data: user, isLoading, isError } = useGetCurrentUser();

  useEffect(() => {
    if (user) {
      setUserProfile(user);
    } else if (isError) {
      setUserProfile(null);
      navigate(ROUTES.AUTH);
    }
  }, [user, isError, navigate, setUserProfile]);

  return {
    isLoading,
    isAuthenticated: !!user,
    user,
  };
};

export default useAuth;
