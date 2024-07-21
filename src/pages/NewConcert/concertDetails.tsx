import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Container, Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useRootStore } from "../../store/StoreContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTE_LIST } from "../../router/routes";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import { SNACKBAR_TEXT } from "../../common/constants/appConstant";
import { formContainerStyle, formStyle, paperStyle } from "./styles";
import { ConcertMainDataForm } from "./concertMainData/concertMainDataForm";
import { NewConcertControlButtons } from "./concertControlButtons/controlButtons";
import { ConcertData } from "../../common/types/concert";
import { ConcertDatesForm } from "./concertDatesDate/concertDatesForm";
import { defaultValues } from "./constants";

export const ConcertDetailsPage: React.FC = () => {
  const {
    concertsStore: { addConcert, getConcert, updateConcert },
  } = useRootStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar } = useCustomSnackbar();
  const isEditPage = location.pathname.includes("/edit");
  const [isEditMode, setIsEditMode] = useState(isEditPage);
  const [isReadOnly, setIsReadOnly] = useState(!!id && !isEditPage);

  const methods = useForm<ConcertData>({
    defaultValues,
    mode: "onChange",
    shouldUnregister: true,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    setIsReadOnly(!!id && !isEditPage);
  }, [id, location.pathname]);

  useEffect(() => {
    setIsEditMode(isEditPage);
  }, [location.pathname]);

  useEffect(() => {
    if (id) {
      const fetchConcertData = async () => {
        const concert = await getConcert(id);
        if (concert) {
          reset(concert);
        }
      };
      fetchConcertData();
    } else {
      reset(defaultValues);
    }
  }, [id, reset, getConcert]);

  const handleCreate: SubmitHandler<ConcertData> = (data) => {
    addConcert(data);
    console.log(data);

    showSnackbar({
      message: SNACKBAR_TEXT.CONCERT_SUCCESSFUL_CREATION,
      variant: "success",
    });
    navigate(`/${ROUTE_LIST.CONCERTS}`);
  };

  const handleUpdate: SubmitHandler<ConcertData> = (data) => {
    if (id) {
      updateConcert(data, id);
      showSnackbar({
        message: SNACKBAR_TEXT.CONCERT_SUCCESSFUL_UPDATE,
        variant: "info",
      });
      navigate(`/${ROUTE_LIST.CONCERTS}/${id}`);
    }
  };

  const submitFormHandler = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    const controlName = event.nativeEvent.submitter?.id;

    switch (controlName) {
      case "btnAdd": {
        handleSubmit(handleCreate)();
        break;
      }
      case "btnUpdate": {
        handleSubmit(handleUpdate)();
        break;
      }
    }
  };

  const openConcertEditView = () => {
    navigate(`/${ROUTE_LIST.CONCERTS}/${id}/edit`);
  };

  const getFormTitle = useMemo(() => {
    return isEditMode ? "Edit" : isReadOnly ? "Concert Details" : "New Concert";
  }, [isReadOnly, isEditMode]);

  return (
    <Container sx={formContainerStyle}>
      <Paper sx={paperStyle} elevation={2}>
        <Box sx={formStyle}>
          <FormProvider {...methods}>
            <form onSubmit={submitFormHandler}>
              <Typography variant="h5">{getFormTitle}</Typography>
              <ConcertMainDataForm readOnly={isReadOnly} />
              <ConcertDatesForm readOnly={isReadOnly} />
              <NewConcertControlButtons
                readOnly={isReadOnly}
                isEditMode={isEditMode}
                onEditClick={openConcertEditView}
              />
            </form>
          </FormProvider>
        </Box>
      </Paper>
    </Container>
  );
};
