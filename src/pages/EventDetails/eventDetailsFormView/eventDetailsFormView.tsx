import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useMemo } from "react";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";

import type { LocalEventData } from "../../../common/types/eventTypes.ts";
import { convertServerEventToLocal } from "../../../store/eventDetails/utils.ts";
import { useRootStore } from "../../../store/StoreContext.tsx";
import { EventDetailsRequests } from "../../../store/transport/eventDetailsTransport/constants.ts";
import { defaultEventValues, eventDetailsText } from "../constants.ts";

import EventDatesForm from "./eventDatesForm/eventDatesForm.tsx";
import { EventDetailsButtons } from "./eventDetailsButtons/eventDetailsButtons.tsx";
import { EventFormFields } from "./eventFormFields/eventFormFields.tsx";
import { formContainerStyles, posterTitleStyles } from "./styles.ts";
import { UploadFileButton } from "./uploadFileButton/uploadFileButton.tsx";
import { useEventHandlers } from "./utils.ts";

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
        requestHandler: { resetRequest },
      },
    },
    eventDetailsUIStore: { resetCurrentEvent, eventPosterTitle },
  } = useRootStore();

  const { id: eventId } = useParams();
  const url = useLocation();

  const newEvent = useMemo(() => url.pathname.includes("/new"), [url.pathname]);
  const editEvent = useMemo(() => url.pathname.includes("/edit"), [url.pathname]);

  const eventInReadonlyMode = useMemo(() => !!eventId && !editEvent, [eventId, editEvent]);

  const getFormTitle = useMemo(() => {
    return editEvent ? title.editForm : title.newForm;
  }, [editEvent]);

  const methods = useForm<LocalEventData>({
    defaultValues: defaultEventValues,
    mode: "onChange",
    shouldUnregister: true,
  });

  const { handleSubmit, reset } = methods;
  const { handleSuccessfulCreate, handleSuccessfulUpdate, handleEventNotFound } =
    useEventHandlers();

  const submitFormHandler = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    const controlName = event.nativeEvent.submitter?.id;

    event.preventDefault();

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

      if (!response) return;

      handleSuccessfulCreate(response);
    },
    [addEvent, handleSuccessfulCreate],
  );

  const handleUpdate: SubmitHandler<LocalEventData> = useCallback(
    async (data) => {
      if (eventId) {
        const response = await updateEvent(eventId, data);

        if (!response) return;

        handleSuccessfulUpdate(eventId);
      }
    },
    [updateEvent, eventId, handleSuccessfulUpdate],
  );

  // TODO: handle unnecessary data re-fetch
  useEffect(() => {
    const fetchEventData = async () => {
      if (!eventId) {
        reset(defaultEventValues);

        return;
      }

      const event = await getEvent(eventId);

      if (!event) {
        handleEventNotFound(eventId);

        return;
      }

      reset(convertServerEventToLocal(event));
    };

    fetchEventData();
  }, [eventId, getEvent, reset, handleEventNotFound]);

  useEffect(() => {
    if (newEvent) resetCurrentEvent();

    return () => resetRequest(EventDetailsRequests.getEvent);
  }, [newEvent, resetCurrentEvent, resetRequest]);

  return (
    <Box display="flex" justifyContent="center">
      <Box sx={formContainerStyles}>
        <FormProvider {...methods}>
          <form onSubmit={submitFormHandler}>
            <Typography variant="h5">{getFormTitle}</Typography>
            <EventFormFields />
            <EventDatesForm />
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
            <EventDetailsButtons isEditMode={editEvent} />
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
});
