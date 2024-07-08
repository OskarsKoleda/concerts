import { useForm, FormProvider, SubmitHandler, useFormContext } from "react-hook-form";
import { Container, Box, Paper, Typography } from "@mui/material";
import { ConcertCreationForm } from "./formContent/concertCreationForm";
import React from "react";
import { useRootStore } from "../../store/StoreContext";
import { useNavigate } from "react-router-dom";
import { ConcertData } from "../../common/types/concert";
import { ROUTE_LIST } from "../../router/routes";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import { SNACKBAR_TEXT } from "../../common/constants/appConstant";
import { formContainerStyle, formStyle } from "./styles";
import { FormLayout } from "../../components/FormLayout/formLayout";
import { FormFields } from "../../components/FormLayout/types";
import { InputType } from "../../components/FormLayout/constants";
import { ConcertDataForm } from "./concertData/concertDataForm";

export const NewConcertPage: React.FC = () => {
  const { concerts } = useRootStore();
  const { showSnackbar } = useCustomSnackbar();
  const navigate = useNavigate();

  const methods = useForm<ConcertData>({
    defaultValues: {
      band: "The Band",
      city: "Miami",
      year: 2024,
      url: "https://i.pinimg.com/originals/27/10/21/2710217cec4b4a2a356573fb619b2236.jpg",
      eventType: 'Concert'
    },
    mode: "onChange",
  });

  const { getValues, reset, handleSubmit } = methods;

  const submitConcertData = (data: ConcertData) => {
    concerts.addConcert({
      band: data.band,
      city: data.city,
      year: data.year,
      url: data.url,
      eventType: 'Festival'
    });
    // navigate(`/${ROUTE_LIST.CONCERTS}`);
    showSnackbar({ message: SNACKBAR_TEXT.CONCERT_SUCCESSFUL_CREATION, variant: "success" });
  };

  const handleComplete: SubmitHandler<ConcertData> = (data) => {
    console.log(data);
    
    submitConcertData(data);
  };

  const submitFormHandler = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    // const controlName = event.nativeEvent.submitter?.id;
    handleSubmit(handleComplete)();
  };

  const resetHandler = () => {
    reset();
  };


  return (
    <Container sx={formContainerStyle}>
      <Paper elevation={2}>
        <Box sx={formStyle}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add a Concert
          </Typography>
          <FormProvider {...methods}>
            <form onSubmit={submitFormHandler}>
              <ConcertCreationForm onReset={resetHandler} />
              <ConcertDataForm/>
            </form>
          </FormProvider>
        </Box>
      </Paper>
    </Container>
  );
};
