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

import { EventDatesForm } from "./eventDatesForm/eventDatesForm.tsx";
import { EventDetailsButtons } from "./eventDetailsButtons/eventDetailsButtons.tsx";
import { EventForm } from "./eventForm/eventForm.tsx";
import { defaultValues, eventDetailsText } from "./constants";
import { formContainerStyle, paperStyle } from "./styles";
import type { LocalEventData } from "../../common/types/eventTypes.ts";
import { EventRetrieveData } from "../../store/responseTypes.ts";
import { convertServerEventToLocal } from "../../store/eventDetails/utils.ts";

const {
  form: { title },
} = eventDetailsText["ENGLISH"];

export const EventDetailsPage: React.FC = observer(function EventDetailsPage() {
  const {
    eventDetailsStore: {
      addEvent,
      getEvent,
      updateEvent,
      eventDetailsTransport: {
        requestHandler: { isSuccessfulRequest, resetRequest },
      },
    },
  } = useRootStore();

  const { id: openedEventId } = useParams();
  const currentURL = useLocation();
  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();
  // TODO: move to some UI store?
  const concertInEditMode = useMemo(
    () => currentURL.pathname.includes("/edit"),
    [currentURL.pathname],
  );
  const concertInReadonlyMode = useMemo(
    () => !!openedEventId && !concertInEditMode,
    [openedEventId, concertInEditMode],
  );

  const displayLoader =
    concertInReadonlyMode && !!openedEventId && !isSuccessfulRequest(EventDetailsRequests.getEvent);

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
      if (openedEventId) {
        const { status, message } = await updateEvent(openedEventId, data);

        showSnackbar({
          message,
          variant: status === "OK" ? SnackbarVariantType.INFO : SnackbarVariantType.ERROR,
        });

        if (status === "OK") {
          navigate(`/${ROUTE_LIST.EVENTS}/${openedEventId}`);
        }
      }
    },
    [updateEvent, showSnackbar, navigate, openedEventId],
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
    async (data) => {
      const response = await addEvent(data);

      showSnackbar({
        message: response.message,
        variant: response.status === "OK" ? SnackbarVariantType.SUCCESS : SnackbarVariantType.ERROR,
      });

      navigate(`/${ROUTE_LIST.EVENTS}`);
    },
    [addEvent, showSnackbar, navigate],
  );

  const openConcertEditView = () => {
    navigate(`/${ROUTE_LIST.EVENTS}/${openedEventId}/edit`);
  };

  useEffect(() => {
    const fetchEventData = async () => {
      if (openedEventId) {
        const { event, message, status }: EventRetrieveData = await getEvent(openedEventId);

        showSnackbar({
          message,
          variant: status === "OK" ? SnackbarVariantType.INFO : SnackbarVariantType.ERROR,
        });

        if (event) {
          const convertedEvent = convertServerEventToLocal(event);
          reset(convertedEvent);
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

    fetchEventData();
  }, [openedEventId, getEvent, navigate, reset, showSnackbar]);

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
              <EventForm readOnly={concertInReadonlyMode} />
              <EventDatesForm readOnly={concertInReadonlyMode} />
              <input {...register("posterImage", { required: true })} type="file" />
              <EventDetailsButtons
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
