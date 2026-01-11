import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useCreateEvent } from "../../api/events/useCreateEvent.ts";
import { useGetEventDetails } from "../../api/events/useGetEventDetails.ts";
import { useUpdateEvent } from "../../api/events/useUpdateEvent.ts";
import { SnackbarVariantType } from "../../common/enums/appEnums.ts";
import useCustomSnackbar from "../../hooks/useCustomSnackbar.ts";
import { defaultEventValues, eventDetailsText } from "../EventDetails/constants.ts";

import CommonEventFields from "./CommonEventFields/CommonEventFields.tsx";
import EventActionButtons from "./EventActionButtons/EventActionButtons.tsx";
import EventDateFields from "./EventDateFields/EventDateFields.tsx";
import FileUpload from "./FileUpload/FileUpload.tsx";
import { formContainerStyles } from "./styles.ts";
import { convertServerEventToLocal, getChangedFields } from "./utils.ts";

import type { SubmitHandler } from "react-hook-form";
import type { LocalEventData } from "../../common/types/eventTypes.ts";

const { title } = eventDetailsText["ENGLISH"].form;

export const EventForm = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const { showSnackbar } = useCustomSnackbar();
  const navigate = useNavigate();

  const isEditMode = useMemo(() => pathname.includes("/edit"), [pathname]);
  const formTitle = useMemo(() => (isEditMode ? title.editForm : title.newForm), [isEditMode]);

  const methods = useForm<LocalEventData>({
    defaultValues: defaultEventValues,
    mode: "onChange",
    shouldUnregister: true,
  });

  const { handleSubmit, reset } = methods;
  const { eventData } = useGetEventDetails(slug);

  const { mutate: mutateCreateEvent, isPending: isCreatingEvent } = useCreateEvent({
    onSuccess: (data) => {
      navigate(`/events/${data.slug}`);
    },
    onError: (error: any) => {
      showSnackbar({
        message: error?.response?.data?.message || "Failed to create event.",
        variant: SnackbarVariantType.Error,
      });
    },
  });

  const { mutate: mutateUpdateEvent, isPending: isUpdatingEvent } = useUpdateEvent({
    onSuccess: (data) => {
      navigate(`/events/${data.slug}`);
      showSnackbar({
        message: "Event was successfully updated",
        variant: SnackbarVariantType.Success,
      });
    },
    onError: (error: any) => {
      showSnackbar({
        message: error?.response?.data?.message || "Failed to update event.",
        variant: SnackbarVariantType.Error,
      });
    },
  });

  const submitFormHandler = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    const controlName = event.nativeEvent.submitter?.id;

    event.preventDefault();

    switch (controlName) {
      case "btnAdd": {
        handleSubmit((data) => mutateCreateEvent(data))();
        break;
      }
      case "btnUpdate": {
        handleSubmit(handleUpdate)();
        break;
      }
    }
  };

  const handleUpdate: SubmitHandler<LocalEventData> = useCallback(
    async (data) => {
      if (!eventData || !slug) {
        return;
      }

      const updatedEventData = getChangedFields(data, eventData);

      mutateUpdateEvent({ slug: slug, event: updatedEventData });
    },
    [eventData, mutateUpdateEvent, slug],
  );

  useEffect(() => {
    if (!slug) {
      reset(defaultEventValues);

      return;
    }

    if (eventData) {
      reset(convertServerEventToLocal(eventData));
    }
  }, [reset, eventData, slug]);

  return (
    <Box sx={formContainerStyles}>
      <Typography color="primary" variant="h4">
        {formTitle}
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={submitFormHandler}>
          <CommonEventFields />
          <EventDateFields />
          <FileUpload buttonTitle="Add Poster" formFieldName="image" />
          <EventActionButtons
            isEditMode={isEditMode}
            isLoading={isCreatingEvent || isUpdatingEvent}
          />
        </form>
      </FormProvider>
    </Box>
  );
};

export default EventForm;
