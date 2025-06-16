import { Box, Typography } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { observer } from "mobx-react-lite";
import React, { useMemo, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import type { AuthUserProfile } from "../../common/types/eventTypes.ts";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar.ts";
import { ROUTE_LIST } from "../../router/routes.ts";
import { useRootStore } from "../../store/StoreContext.tsx";
import { FirebaseAuthRequests } from "../../store/transport/authTransport/constants.ts";
import { defaultUserValues } from "../EventDetails/constants.ts";

import { AuthButtons } from "./authButtons.tsx";
import { AuthFormFields } from "./authFormFields.tsx";
import { bottomCaptionStyles } from "./styles.ts";

export const Auth = observer(function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");
  const {
    transport: { requestHandler },
    userStore: { createUser, loginUser },
  } = useRootStore();

  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();

  const methods = useForm<AuthUserProfile>({
    defaultValues: defaultUserValues,
    mode: "onChange",
    shouldUnregister: true,
  });

  const mode = searchParams.get("mode") || "login";
  const isSignupMode = mode === "signup";
  const processingSignUp = requestHandler.isProcessingRequest(FirebaseAuthRequests.signUp); // TODO: make method

  const { handleSubmit } = methods;

  const toggleAuthMode = () => {
    isSignupMode ? setSearchParams({ mode: "login" }) : setSearchParams({ mode: "signup" });
  };

  const submitFormHandler = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    const controlName = event.nativeEvent.submitter?.id;

    event.preventDefault();

    switch (controlName) {
      case "btnSignUp": {
        handleSubmit(handleSignUp)();
        break;
      }
      case "btnLogin": {
        handleSubmit(handleLogin)();
        break;
      }
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
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        throw error;
      }
    }
  };

  const handleLogin: SubmitHandler<AuthUserProfile> = async (data) => {
    try {
      const response = await loginUser(data);

      if (response) navigate(ROUTE_LIST.HOMEPAGE);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        throw error;
      }
    }
  };

  const bottomCaptionText = useMemo(() => {
    return isSignupMode ? (
      <>
        Already have an account? <span>Log in</span>
      </>
    ) : (
      <>
        Don&apos;t have an account? <span>Sign Up</span>
      </>
    );
  }, [isSignupMode]);

  return (
    <Box display="flex" height="100%" mt={10}>
      <Box width="500px">
        <FormProvider {...methods}>
          <form onSubmit={submitFormHandler}>
            <AuthFormFields signUp={isSignupMode} />
            <Typography
              onClick={toggleAuthMode}
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
            <AuthButtons signUp={isSignupMode} loading={processingSignUp} />
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
});
