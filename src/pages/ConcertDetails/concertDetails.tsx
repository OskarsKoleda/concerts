import { Container, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useMemo } from "react";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ResponseMessages } from "../../common/constants/appConstant";
import { SnackbarVariantType } from "../../common/enums/appEnums";
import { ContentLoader } from "../../components/ContentLoader/contentLoader";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar";
import { ROUTE_LIST } from "../../router/routes";
import { useRootStore } from "../../store/StoreContext";
import { EventDetailsRequests } from "../../store/transport/eventDetailsTransport/constants";

import { ConcertDatesForm } from "./concertDatesForm/concertDatesForm";
import { ConcertDetailsButtons } from "./concertDetailsButtons/concertDetailsButtons";
import { ConcertForm } from "./concertForm/concertForm";
import { concertText, defaultValues } from "./constants";
import { formContainerStyle, paperStyle } from "./styles";
import type { LocalEventData } from "../../common/types/eventTypes.ts";

const {
  ENGLISH: {
    form: { title },
  },
} = concertText;

export const ConcertDetailsPage: React.FC = observer(function ConcertDetailsPage() {
  const { id: concertId } = useParams();
  const currentURL = useLocation();

  const {
    concertDetailsStore: {
      addEvent,
      getEvent,
      updateEvent,
      eventDetailsTransport: {
        requestHandler: { isSuccessfulRequest, resetRequest },
      },
    },
  } = useRootStore();

  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();
  // TODO: move to some UI store?
  const concertInEditMode = useMemo(
    () => currentURL.pathname.includes("/edit"),
    [currentURL.pathname],
  );
  const concertInReadonlyMode = useMemo(
    () => !!concertId && !concertInEditMode,
    [concertId, concertInEditMode],
  );

  const displayLoader =
    concertInReadonlyMode && !!concertId && !isSuccessfulRequest(EventDetailsRequests.getEvent);

  const getFormTitle = useMemo(() => {
    return concertInEditMode
      ? title.editForm
      : concertInReadonlyMode
        ? title.detailsForm
        : title.newForm;
  }, [concertInEditMode, concertInReadonlyMode]);

  const methods = useForm<LocalEventData>({
    defaultValues,
    mode: "onChange",
    shouldUnregister: true,
  });

  const { handleSubmit, reset, register } = methods;

  const handleUpdate: SubmitHandler<LocalEventData> = useCallback(
    async (data) => {
      if (concertId) {
        const { status, message } = await updateEvent(data, concertId);

        if (status === "OK") {
          showSnackbar({ message, variant: SnackbarVariantType.INFO });
          navigate(`/${ROUTE_LIST.EVENTS}/${concertId}`);
        } else {
          showSnackbar({ message, variant: SnackbarVariantType.ERROR });
        }
      }
    },
    [updateEvent, showSnackbar, navigate, concertId],
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

  const handleCreate: SubmitHandler<LocalEventData> = useCallback(
    (data) => {
      addEvent(data);

      showSnackbar({
        message: ResponseMessages.EVENT_SUCCESSFUL_CREATION,
        variant: SnackbarVariantType.SUCCESS,
      });
      navigate(`/${ROUTE_LIST.EVENTS}`);
    },
    [addEvent, showSnackbar, navigate],
  );

  const openConcertEditView = () => {
    navigate(`/${ROUTE_LIST.EVENTS}/${concertId}/edit`);
  };

  useEffect(() => {
    const fetchConcertData = async () => {
      if (concertId) {
        const concert = await getEvent(concertId);

        if (concert) {
          reset(concert);
        } else {
          showSnackbar({
            message: ResponseMessages.EVENT_FAILED_RETRIEVE,
            variant: SnackbarVariantType.ERROR,
          });
          navigate(`/${ROUTE_LIST.EVENTS}`);
        }
      } else {
        reset(defaultValues);
      }
    };

    fetchConcertData();
  }, [concertId, getEvent, navigate, reset, showSnackbar]);

  useEffect(() => {
    return () => {
      resetRequest(EventDetailsRequests.getEvent);
    };
  }, []);

  // TODO: change file input somehow
  return (
    <ContentLoader isLoading={displayLoader}>
      <Container sx={formContainerStyle}>
        <Paper sx={paperStyle} elevation={2}>
          <FormProvider {...methods}>
            <form onSubmit={submitFormHandler}>
              <Typography variant="h5">{getFormTitle}</Typography>
              <ConcertForm readOnly={concertInReadonlyMode} />
              <ConcertDatesForm readOnly={concertInReadonlyMode} />
              <input {...register("posterImage", { required: true })} type="file" />
              <ConcertDetailsButtons
                readOnly={concertInReadonlyMode}
                isEditMode={concertInEditMode}
                onEditClick={openConcertEditView}
              />
            </form>
          </FormProvider>
        </Paper>
      </Container>
    </ContentLoader>
  );
});
