import { Box, Typography } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { observer } from "mobx-react-lite";
import React, { useMemo, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import type { AuthUserProfile } from "../../common/types/eventTypes.ts";
import useCustomSnackbar from "../../hooks/useCustomSnackbar.ts";
import { ROUTE_LIST } from "../../router/routes.ts";
import { useRootStore } from "../../store/StoreContext.tsx";
import { defaultUserValues } from "../EventDetails/constants.ts";

import AuthButtons from "./AuthButtons/AuthButtons.tsx";
import AuthFormFields from "./AuthFormFields/AuthFormFields.tsx";
import { AuthMode } from "./constants.ts";
import { bottomCaptionStyles } from "./styles.ts";
import { getFirebaseError } from "./utils.ts";

const Auth = () => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const [error, setError] = useState("");
  const {
    userStore: { createUser, loginUser, isLoginInProgress, isSignUpInProgress },
  } = useRootStore();

  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();

  const methods = useForm<AuthUserProfile>({
    defaultValues: defaultUserValues,
    mode: "onChange",
    shouldUnregister: true,
  });

  const mode = urlSearchParams.get("mode") ?? AuthMode.login;
  const isSignUpMode = mode === AuthMode.signup;
  const { handleSubmit } = methods;

  const handleAuthModeChange = () => {
    isSignUpMode
      ? setUrlSearchParams({ mode: AuthMode.login })
      : setUrlSearchParams({ mode: AuthMode.signup });
  };

  const submitHandlers = {
    btnSignUp: () => handleSubmit(handleSignUp)(),
    btnLogin: () => handleSubmit(handleLogin)(),
  };

  const submitFormHandler = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    const controlName = event.nativeEvent.submitter?.id;
    if (controlName) {
      submitHandlers[controlName as keyof typeof submitHandlers]?.();
    }
  };

  const handleSignUp: SubmitHandler<AuthUserProfile> = async (data) => {
    try {
      const response = await createUser(data);

      if (response) {
        showSnackbar({
          message: "Sign up successfully",
          variant: "success",
        });

        navigate(ROUTE_LIST.HOMEPAGE);
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleLogin: SubmitHandler<AuthUserProfile> = async (data) => {
    try {
      const response = await loginUser(data);

      if (response) navigate(ROUTE_LIST.HOMEPAGE);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error: unknown) => {
    if (error instanceof FirebaseError) {
      setError(getFirebaseError(error));
    } else {
      throw error;
    }
  };

  const bottomCaptionText = useMemo(() => {
    return isSignUpMode ? (
      <>
        Already have an account? <span>Log in</span>
      </>
    ) : (
      <>
        Don&apos;t have an account? <span>Sign Up</span>
      </>
    );
  }, [isSignUpMode]);

  return (
    <Box width="35%" mt={10}>
      <FormProvider {...methods}>
        <form onSubmit={submitFormHandler}>
          <AuthFormFields signUp={isSignUpMode} />
          <Typography
            onClick={handleAuthModeChange}
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
          <AuthButtons signUp={isSignUpMode} loading={isLoginInProgress || isSignUpInProgress} />
        </form>
      </FormProvider>
    </Box>
  );
};

export default observer(Auth);
