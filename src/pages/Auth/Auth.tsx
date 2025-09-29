import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
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
import { useAuthError } from "./hooks/useAuthError.ts";
import { useAuthMode } from "./hooks/useAuthMode.ts";
import { bottomCaptionStyles } from "./styles.ts";

import type { CreateUserRequest } from "../../common/types/userTypes.ts";

const Auth = () => {
  const { setUserProfile } = useRootStore().userStore;

  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();

  const { isSignUpMode, toggleMode } = useAuthMode();
  const { error, handleError } = useAuthError();

  const methods = useForm<CreateUserRequest>({
    defaultValues: defaultUserValues,
    mode: "onChange",
    shouldUnregister: true,
  });

  const { mutate: createUser } = useCreateUser({
    onSuccess: (data) => {
      navigate(ROUTES.HOMEPAGE);
      showSnackbar({
        message: "Sign up successfully",
        variant: "success",
      });

      setUserProfile(data);
    },
    onError: (error) => handleError(error),
  });

  const { mutate: login } = useLogin({
    onSuccess: (data) => {
      navigate(ROUTES.HOMEPAGE);
      setUserProfile(data);
    },
    onError: (error) => handleError(error),
  });

  const submitFormHandler = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    const controlName = event.nativeEvent.submitter?.id;

    event.preventDefault();

    if (controlName === "btnSignUp") {
      methods.handleSubmit((data) => createUser(data))();
    } else if (controlName === "btnLogin") {
      methods.handleSubmit((data) => login(data))();
    }
  };

  const bottomCaptionText = useMemo(() => {
    return isSignUpMode ? "Already have an account? Log in" : "Don't have an account? Sign Up";
  }, [isSignUpMode]);

  return (
    <Box width="35%" mt={10}>
      <FormProvider {...methods}>
        <form onSubmit={submitFormHandler}>
          <AuthFormFields signUp={isSignUpMode} />
          <Typography
            onClick={toggleMode}
            variant="body2"
            color="textSecondary"
            sx={bottomCaptionStyles}
          >
            {bottomCaptionText}
          </Typography>
          {error && (
            <Typography variant="caption" color="red">
              {error}
            </Typography>
          )}
          <AuthButtons signUp={isSignUpMode} />
        </form>
      </FormProvider>
    </Box>
  );
};

export default observer(Auth);
