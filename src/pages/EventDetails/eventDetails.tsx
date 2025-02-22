import { Box, Container, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useMemo } from "react";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SnackbarVariantType } from "../../common/enums/appEnums";
import { ContentLoader } from "../../components/ContentLoader/contentLoader";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar";
import { ROUTE_LIST } from "../../router/routes";
import { useRootStore } from "../../store/StoreContext";
import { EventDetailsRequests } from "../../store/transport/eventDetailsTransport/constants";

import type { LocalEventData } from "../../common/types/eventTypes.ts";
import { convertServerEventToLocal } from "../../store/eventDetails/utils.ts";
import { EventDatesForm } from "./eventDatesForm/eventDatesForm.tsx";
import { EventDetailsButtons } from "./eventDetailsButtons/eventDetailsButtons.tsx";
import { EventFormFields } from "./eventFormFields/eventFormFields.tsx";
import { defaultValues, eventDetailsText } from "./constants";
import { formContainerStyles, paperStyles, posterTitleStyles } from "./styles";
import { UploadFileButton } from "./uploadFileButton/uploadFileButton.tsx";

const {
  form: { title },
} = eventDetailsText["ENGLISH"];

export const EventDetailsPage: React.FC = observer(function EventDetailsPage() {
  const {
    eventDetailsRequestStore: {
      addEvent,
      getEvent,
      updateEvent,
      eventDetailsTransport: {
        requestHandler: { isSuccessfulRequest, resetRequest },
      },
    },
    eventDetailsUIStore: { setEventId, setPosterTitle, resetEvent, eventPosterTitle },
  } = useRootStore();

  const { id: openedEventId } = useParams();

  const { showSnackbar } = useCustomSnackbar();
  const currentURL = useLocation();
  const navigate = useNavigate();
  const newEventPage = useMemo(() => currentURL.pathname.includes("/new"), [currentURL.pathname]);
  const eventInEditMode = useMemo(
    () => currentURL.pathname.includes("/edit"),
    [currentURL.pathname],
  );

  const eventInReadonlyMode = useMemo(
    () => !!openedEventId && !eventInEditMode,
    [openedEventId, eventInEditMode],
  );

  const displayLoader =
    eventInReadonlyMode && !!openedEventId && !isSuccessfulRequest(EventDetailsRequests.getEvent);

  const getFormTitle = useMemo(() => {
    return eventInEditMode
      ? title.editForm
      : eventInReadonlyMode
        ? title.detailsForm
        : title.newForm;
  }, [eventInEditMode, eventInReadonlyMode]);

  const methods = useForm<LocalEventData>({
    defaultValues,
    mode: "onChange",
    shouldUnregister: true,
  });

  const { handleSubmit, reset } = methods;

  const handleUpdate: SubmitHandler<LocalEventData> = useCallback(
    async (data) => {
      if (openedEventId) {
        const response = await updateEvent(openedEventId, data);

        if (!response) {
          return;
        }

        showSnackbar({
          message: `Event ${response} successfully updated`,
          variant: SnackbarVariantType.INFO,
        });

        navigate(`/${ROUTE_LIST.EVENTS}/${openedEventId}`);
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

      if (!response) {
        return;
      }

      showSnackbar({
        message: `Added new event - ${response}`,
        variant: SnackbarVariantType.SUCCESS,
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
        setEventId(openedEventId);
        const event = await getEvent(openedEventId);

        if (!event) {
          navigate(`/${ROUTE_LIST.EVENTS}`);
          showSnackbar({
            message: `Event ${openedEventId} not found!`,
            variant: SnackbarVariantType.ERROR,
          });

          return;
        }
        const convertedEvent = convertServerEventToLocal(event);

        reset(convertedEvent);
      } else {
        reset(defaultValues);
      }
    };

    fetchEventData();
  }, [openedEventId, getEvent, navigate, reset, showSnackbar]);

  useEffect(() => {
    if (eventInEditMode || newEventPage) {
      setPosterTitle("");
    }

    if (newEventPage) {
      resetEvent();
    }

    return () => {
      resetRequest(EventDetailsRequests.getEvent);
    };
  }, [eventInEditMode, newEventPage, setPosterTitle, resetEvent]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <ContentLoader isLoading={displayLoader}>
      <Container sx={formContainerStyles}>
        <Paper sx={paperStyles} elevation={2}>
          <FormProvider {...methods}>
            <form onSubmit={submitFormHandler}>
              <Typography variant="h5">{getFormTitle}</Typography>
              <EventFormFields readOnly={eventInReadonlyMode} />
              <EventDatesForm readOnly={eventInReadonlyMode} />
              <Box display="flex" alignItems="flex-end">
                <UploadFileButton
                  buttonTitle="Add Poster"
                  formFieldName="posterImage"
                  readonly={eventInReadonlyMode}
                />
                <Typography variant="caption" sx={posterTitleStyles(eventInReadonlyMode)}>
                  {eventPosterTitle}
                </Typography>
              </Box>
              <EventDetailsButtons
                readOnly={eventInReadonlyMode}
                isEditMode={eventInEditMode}
                onEditClick={openConcertEditView}
              />
            </form>
          </FormProvider>
        </Paper>
      </Container>
    </ContentLoader>
  );
});
