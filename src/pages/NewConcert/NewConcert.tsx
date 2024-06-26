import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Container, Box, Paper, Typography } from "@mui/material";
import { ConcertCreationForm } from "./formContent/concertCreationForm/concertCreationForm";
import React from "react";
import { formContainerStyle } from "./styles";
import { useStore } from "../../store/StoreContext";

export interface ConcertPageInputs {
  band: string;
  city: string;
  year: number;
  poster: string;
}

export default function NewConcertPage() {
  const { concertStore } = useStore();

  const methods = useForm<ConcertPageInputs>({
    defaultValues: {
      band: "Death",
      city: "Miami",
      year: 2024,
      poster: "https://i.pinimg.com/originals/27/10/21/2710217cec4b4a2a356573fb619b2236.jpg",
    },
    mode: "onChange",
  });

  const { getValues, reset, handleSubmit, trigger, setFocus } = methods;

  const submitConcertData = (data: ConcertPageInputs) => {
    concertStore.addConcert({
      band: data.band,
      city: data.city,
      year: data.year,
      url: data.poster,
    });
  };

  const handleComplete: SubmitHandler<ConcertPageInputs> = (data) => {
    submitConcertData(data);
  };

  const submitFormHandler = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    // const controlName = event.nativeEvent.submitter?.id;
    handleSubmit(handleComplete)();
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={2}>
          <Box sx={formContainerStyle}>
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
}
