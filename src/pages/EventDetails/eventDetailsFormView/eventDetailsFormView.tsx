import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useMemo } from "react";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SnackbarVariantType } from "../../../common/enums/appEnums.ts";
import { ContentLoader } from "../../../components/ContentLoader/contentLoader.tsx";
import { useCustomSnackbar } from "../../../hooks/useCustomSnackbar.ts";
import { ROUTE_LIST } from "../../../router/routes.ts";
import { useRootStore } from "../../../store/StoreContext.tsx";
import { EventDetailsRequests } from "../../../store/transport/eventDetailsTransport/constants.ts";

import type { LocalEventData } from "../../../common/types/eventTypes.ts";
import { EventDatesForm } from "./eventDatesForm/eventDatesForm.tsx";
import { EventDetailsButtons } from "./eventDetailsButtons/eventDetailsButtons.tsx";
import { EventFormFields } from "./eventFormFields/eventFormFields.tsx";
import { defaultValues, eventDetailsText } from "../constants.ts";
import { formContainerStyles, posterTitleStyles } from "./styles.ts";
import { UploadFileButton } from "./uploadFileButton/uploadFileButton.tsx";
import { convertServerEventToLocal } from "../../../store/eventDetails/utils.ts";

const {
  form: { title },
} = eventDetailsText["ENGLISH"];

export const EventDetailsFormView: React.FC = observer(function EventDetailsFormView() {
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

  const { id: eventId } = useParams();

  const { showSnackbar } = useCustomSnackbar();
  const url = useLocation();
  const navigate = useNavigate();
  const newEvent = useMemo(() => url.pathname.includes("/new"), [url.pathname]);
  const editEvent = useMemo(() => url.pathname.includes("/edit"), [url.pathname]);

  const eventInReadonlyMode = useMemo(() => !!eventId && !editEvent, [eventId, editEvent]);

  const displayLoader =
    eventInReadonlyMode && !!eventId && !isSuccessfulRequest(EventDetailsRequests.getEvent);

  const getFormTitle = useMemo(() => {
    return editEvent ? title.editForm : title.newForm;
  }, [editEvent]);

  const methods = useForm<LocalEventData>({
    defaultValues,
    mode: "onChange",
    shouldUnregister: true,
  });

  const { handleSubmit, reset } = methods;

  const handleUpdate: SubmitHandler<LocalEventData> = useCallback(
    async (data) => {
      if (eventId) {
        const response = await updateEvent(eventId, data);

        if (!response) {
          return;
        }

        showSnackbar({
          message: `Event ${response} successfully updated`,
          variant: SnackbarVariantType.INFO,
        });

        navigate(`/${ROUTE_LIST.EVENTS}/${eventId}`);
      }
    },
    [updateEvent, showSnackbar, navigate, eventId],
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

  const openEventEditView = () => {
    navigate(`/${ROUTE_LIST.EVENTS}/${eventId}/edit`);
  };

  useEffect(() => {
    const fetchEventData = async () => {
      if (eventId) {
        const event = await getEvent(eventId);

        if (!event) {
          navigate(`/${ROUTE_LIST.EVENTS}`);
          showSnackbar({
            message: `Event ${eventId} not found!`,
            variant: SnackbarVariantType.ERROR,
          });

          return;
        }

        setEventId(eventId);

        const convertedEventData = convertServerEventToLocal(event);

        reset(convertedEventData);
      } else {
        reset(defaultValues);
      }
    };

    fetchEventData();
  }, [eventId, getEvent, navigate, reset, showSnackbar]);

  useEffect(() => {
    if (newEvent) resetEvent();

    return () => resetRequest(EventDetailsRequests.getEvent);
  }, [editEvent, newEvent, setPosterTitle, resetEvent]);

  return (
    <ContentLoader isLoading={displayLoader}>
      <Box display="flex" justifyContent={"center"}>
        <Box sx={formContainerStyles}>
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
                isEditMode={editEvent}
                onEditClick={openEventEditView}
              />
            </form>
          </FormProvider>
        </Box>
      </Box>
    </ContentLoader>
  );
});
