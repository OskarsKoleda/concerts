import { useForm, FormProvider } from "react-hook-form";
import { Container, Box, Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useRootStore } from "../../store/StoreContext";
import { ROUTE_LIST } from "../../router/routes";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import { SnackbarText } from "../../common/constants/appConstant";

import { formContainerStyle, formStyle, paperStyle } from "./styles";
import { ConcertMainDataForm } from "./concertMainData/concertMainDataForm";
import { NewConcertControlButtons } from "./concertControlButtons/controlButtons";
import { ConcertDatesForm } from "./concertDatesDate/concertDatesForm";
import { defaultValues } from "./constants";

import type { ConcertData } from "../../common/types/concert";
import type { SubmitHandler } from "react-hook-form";

export const ConcertDetailsPage: React.FC = observer(() => {
  const {
    concertsStore: { addConcert, getConcert, updateConcert, isConcertUpdateSuccessful },
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
    setIsEditMode(isEditPage);

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
  }, [id, location.pathname, isEditPage, getConcert, reset]);

  const handleCreate: SubmitHandler<ConcertData> = useCallback(
    (data) => {
      addConcert(data);
      showSnackbar({
        message: SnackbarText.CONCERT_SUCCESSFUL_CREATION,
        variant: "success",
      });
      navigate(`/${ROUTE_LIST.CONCERTS}`);
    },
    [addConcert, showSnackbar, navigate],
  );

  const handleUpdate: SubmitHandler<ConcertData> = useCallback(
    async (data) => {
      if (id) {
        await updateConcert(data, id);

        if (isConcertUpdateSuccessful) {
          showSnackbar({
            message: SnackbarText.CONCERT_SUCCESSFUL_UPDATE,
            variant: "info",
          });
          navigate(`/${ROUTE_LIST.CONCERTS}/${id}`);
        } else {
          showSnackbar({
            message: "sadness",
            variant: "error",
          });
        }
      }
    },
    [updateConcert, showSnackbar, navigate, isConcertUpdateSuccessful, id],
  );

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
    return isEditMode ? "Edit Event" : isReadOnly ? "Concert Details" : "New Concert";
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
});
