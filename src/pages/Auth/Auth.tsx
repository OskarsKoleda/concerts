import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../../api/auth/useLogin.ts";
import { useCreateUser } from "../../api/user/useCreateUser.ts";
import useCustomSnackbar from "../../hooks/useCustomSnackbar.ts";
import { ROUTES } from "../../router/routes.ts";
import { useRootStore } from "../../store/StoreContext.tsx";
import { defaultUserValues } from "../EventDetails/constants.ts";

import AuthButtons from "./AuthButtons/AuthButtons.tsx";
import AuthFormFields from "./AuthFormFields/AuthFormFields.tsx";
import { useAuthMode } from "./hooks/useAuthMode.ts";
import AuthHelperCaption from "./AuthHelperCaption/AuthHelperCaption.tsx";
import { authFormStyles } from "./styles.ts";

import type { AxiosErrorResponse } from "../../common/types/appTypes.ts";
import type { CreateUserRequest } from "../../common/types/userTypes.ts";

const Auth = () => {
  const [error, setError] = useState<string>("");
  const { setUserProfile } = useRootStore().userStore;
  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();

  const { isSignUpMode } = useAuthMode();

  const methods = useForm<CreateUserRequest>({
    defaultValues: defaultUserValues,
    mode: "onChange",
    shouldUnregister: true,
  });

  const handleError = (error: AxiosErrorResponse) => {
    setError(error.response?.data?.message ?? error.message ?? "Something went wrong");
  };

  const { mutate: createUser, isPending: isCreateUserPending } = useCreateUser({
    onSuccess: (data) => {
      setUserProfile(data);
      showSnackbar({
        message: "Sign up successfully",
        variant: "success",
      });
      navigate(ROUTES.HOMEPAGE);
    },
  });

  const { mutate: login, isPending: isLoginPending } = useLogin({
    onSuccess: (data) => {
      setUserProfile(data);
      navigate(ROUTES.HOMEPAGE);
    },
  });

  const submitFormHandler = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    const controlName = event.nativeEvent.submitter?.id;
    event.preventDefault();

    if (controlName === "btnSignUp") {
      methods.handleSubmit((data) => {
        setError("");
        createUser(data, {
          onError: handleError,
        });
      })();
    } else if (controlName === "btnLogin") {
      methods.handleSubmit((data) => {
        setError("");
        login(data, {
          onError: handleError,
        });
      })();
    }
  };

  return (
    <>
      <Box sx={authFormStyles}>
        <Typography color="primary" variant="h4">
          {isSignUpMode ? "Sign Up" : "Login"}
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={submitFormHandler}>
            <AuthFormFields signUp={isSignUpMode} />
            <AuthHelperCaption resetForm={methods.reset} />
            {error && (
              <Typography variant="caption" color="red">
                {error}
              </Typography>
            )}
            <AuthButtons signUp={isSignUpMode} isLoading={isLoginPending || isCreateUserPending} />
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default observer(Auth);
