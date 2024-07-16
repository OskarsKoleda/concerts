import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Container, Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRootStore } from "../../store/StoreContext";
import { useNavigate, useParams } from "react-router-dom";
import { ConcertData } from "../../common/types/concert";
import { ROUTE_LIST } from "../../router/routes";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import { SNACKBAR_TEXT } from "../../common/constants/appConstant";
import { formContainerStyle, formStyle } from "./styles";
import { ConcertDataForm } from "./concertData/concertDataForm";
import { NewConcertControlButtons } from "./concertControlButtons/controlButtons";

export const NewConcertPage: React.FC = () => {
  const {
    concertsStore: { addConcert, getConcert },
  } = useRootStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();
  const [isReadOnly, setIsReadOnly] = useState<boolean>(!!id);

  const methods = useForm<ConcertData>({
    defaultValues: {
      title: "",
      city: "",
      year: 2000,
      posterUrl: "",
      eventType: "Concert",
      date: "",
    },
    mode: "onChange",
    shouldUnregister: true,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (id) {
      const fetchConcertData = async () => {
        const concert = await getConcert(id);
        if (concert) {
          reset(concert);
        }
      };

      fetchConcertData();
    }
  }, [id, reset, getConcert]);

  const submitConcertData = (data: ConcertData) => {
    // add check if ID exists, to UPDATE instead of add. Add update function in transport?
    addConcert(data);
    navigate(`/${ROUTE_LIST.CONCERTS}`);
    showSnackbar({ message: SNACKBAR_TEXT.CONCERT_SUCCESSFUL_CREATION, variant: "success" });
  };

  const handleComplete: SubmitHandler<ConcertData> = (data) => {
    console.log(data); // TODO: remove later
    submitConcertData(data);
  };

  const submitFormHandler = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    // const controlName = event.nativeEvent.submitter?.id;
    handleSubmit(handleComplete)();
  };

  const toggleEditMode = () => {
    setIsReadOnly((isReadOnly) => !isReadOnly);
  };

  return (
    <Container sx={formContainerStyle}>
      <Paper elevation={2}>
        <Box sx={formStyle}>
          <FormProvider {...methods}>
            <form onSubmit={submitFormHandler} >
              <ConcertDataForm readOnly={isReadOnly} />
              {/* <NewConcertControlButtons readonly={isReadOnly} onEditClick={toggleEditMode}/> */}
              <NewConcertControlButtons />
            </form>
          </FormProvider>
        </Box>
      </Paper>
    </Container>
  );
};
