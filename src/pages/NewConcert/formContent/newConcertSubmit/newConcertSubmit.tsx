import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Container, Box, Paper, Typography } from "@mui/material";
import { ConcertCreationForm } from "./concertCreationForm/concertCreationForm";
import React from "react";
import { useRootStore } from "../../../../store/StoreContext";
import { useNavigate } from "react-router-dom";
import { ConcertData } from "../../../../common/types/concert";
import { ROUTE_LIST } from "../../../../router/routes";
import useCustomSnackbar from "../../../../hooks/useCustomSnackbar";
import { SNACKBAR_TEXT } from "../../../../common/constants/appConstant";
import { formContainerStyle, formStyle } from "./styles";

export const NewConcertSubmit: React.FC = () => {
  const { concerts } = useRootStore();
  const { showSnackbar } = useCustomSnackbar();
  const navigate = useNavigate();
  const methods = useForm<ConcertData>({
    defaultValues: {
      band: "The Band",
      city: "Miami",
      year: 2024,
      url: "https://i.pinimg.com/originals/27/10/21/2710217cec4b4a2a356573fb619b2236.jpg",
    },
    mode: "onChange",
  });

  const { getValues, reset, handleSubmit, trigger, setFocus } = methods;

  const submitConcertData = (data: ConcertData) => {
    concerts.addConcert({
      band: data.band,
      city: data.city,
      year: data.year,
      url: data.url,
    });
    navigate(`/${ROUTE_LIST.CONCERTS}`);
    showSnackbar({ message: SNACKBAR_TEXT.CONCERT_SUCCESSFUL_CREATION, variant: "success" });
  };

  const handleComplete: SubmitHandler<ConcertData> = (data) => {
    submitConcertData(data);
  };

  const submitFormHandler = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    // const controlName = event.nativeEvent.submitter?.id;
    handleSubmit(handleComplete)();
  };

  return (
    <>
      <Container sx={formContainerStyle} >
        <Paper elevation={2}>
          <Box sx={formStyle}>
            <Typography variant="h4" component="h1" gutterBottom>
              Add a Concert
            </Typography>
            <FormProvider {...methods}>
              <form onSubmit={submitFormHandler}>
                <ConcertCreationForm />
              </form>
            </FormProvider>
          </Box>
        </Paper>
      </Container>
    </>
  );
};
