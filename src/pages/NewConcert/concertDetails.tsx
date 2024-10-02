import { useForm, FormProvider } from "react-hook-form";
import { Container, Box, Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useRootStore } from "../../store/StoreContext";
import { ROUTE_LIST } from "../../router/routes";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import { ResponseMessages } from "../../common/constants/appConstant";
import { ContentLoader } from "../../components/ContentLoader/contentLoader";
import { ConcertRequests } from "../../store/transport/concertTransport/constants";

import { formContainerStyle, formStyle, paperStyle } from "./styles";
import { ConcertMainDataForm } from "./concertMainData/concertMainDataForm";
import { NewConcertControlButtons } from "./concertControlButtons/controlButtons";
import { ConcertDatesForm } from "./concertDatesDate/concertDatesForm";
import { defaultValues } from "./constants";

import type { ConcertData } from "../../common/types/concert";
import type { SubmitHandler } from "react-hook-form";

export const ConcertDetailsPage: React.FC = observer(() => {
  const {
    concertsStore: {
      addConcert,
      getConcert,
      updateConcert,
      transport: {
        requestHandler: { isSuccessfulRequest },
      },
    },
  } = useRootStore();

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar } = useCustomSnackbar();
  const isEditPage = useMemo(() => location.pathname.includes("/edit"), [location.pathname]);
  const isReadOnly = useMemo(() => !!id && !isEditPage, [id, isEditPage]);

  const methods = useForm<ConcertData>({
    defaultValues,
    mode: "onChange",
    shouldUnregister: true,
  });
  const { handleSubmit, reset } = methods;
  const concertIsLoaded = isSuccessfulRequest(ConcertRequests.getConcert);

  const fetchConcertData = useCallback(async () => {
    if (id) {
      const { message, concert } = await getConcert(id);

      if (concert) {
        reset(concert);
      } else {
        showSnackbar({ message, variant: "error" });
        navigate(`/${ROUTE_LIST.CONCERTS}`);
      }
    } else {
      reset(defaultValues);
    }
  }, [id, getConcert, reset]);

  const handleUpdate: SubmitHandler<ConcertData> = useCallback(
    async (data) => {
      if (id) {
        const { status, message } = await updateConcert(data, id);

        if (status === "OK") {
          showSnackbar({ message, variant: "info" });
          navigate(`/${ROUTE_LIST.CONCERTS}/${id}`);
        } else {
          showSnackbar({ message, variant: "error" });
        }
      }
    },
    [updateConcert, showSnackbar, navigate, id],
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

  const handleCreate: SubmitHandler<ConcertData> = useCallback(
    (data) => {
      addConcert(data);
      showSnackbar({
        message: ResponseMessages.CONCERT_SUCCESSFUL_CREATION,
        variant: "success",
      });
      navigate(`/${ROUTE_LIST.CONCERTS}`);
    },
    [addConcert, showSnackbar, navigate],
  );

  const openConcertEditView = () => {
    navigate(`/${ROUTE_LIST.CONCERTS}/${id}/edit`);
  };

  const getFormTitle = useMemo(() => {
    return isEditPage ? "Edit Event" : isReadOnly ? "Concert Details" : "New Concert";
  }, [isReadOnly, isEditPage]);

  useEffect(() => {
    fetchConcertData();
  }, [fetchConcertData]);

  return (
    <ContentLoader isLoading={!concertIsLoaded}>
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
                  isEditMode={isEditPage}
                  onEditClick={openConcertEditView}
                />
              </form>
            </FormProvider>
          </Box>
        </Paper>
      </Container>
    </ContentLoader>
  );
});
