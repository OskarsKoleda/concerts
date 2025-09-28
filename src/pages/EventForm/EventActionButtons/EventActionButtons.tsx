import { memo, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { useDeleteEvent } from "../../../api/events/useDeleteEvent";
import { SnackbarVariantType } from "../../../common/enums/appEnums";
import ButtonsLayout from "../../../components/ButtonsLayout/ButtonsLayout";
import ButtonWithConfirmDialog from "../../../components/ButtonWithConfirmDialog/ButtonWithConfirmDialog";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import { ROUTES } from "../../../router/routes";

import type { ControlPayload } from "../../../common/types/appTypes";
import type { LocalEventData } from "../../../common/types/eventTypes";

interface EventActionButtonsProps {
  isEditMode: boolean;
}

export const EventActionButtons = ({ isEditMode }: EventActionButtonsProps) => {
  const {
    reset,
    formState: { dirtyFields },
  } = useFormContext<LocalEventData>();

  const navigate = useNavigate();
  const { mutate } = useDeleteEvent();
  const { slug } = useParams();
  const { showSnackbar } = useCustomSnackbar();
  const isFormReallyDirty = Object.keys(dirtyFields).length > 0;

  const deleteEvent = useCallback(
    async (slug?: string) => {
      if (!slug) {
        return;
      }

      mutate(slug, {
        onSuccess: () => {
          navigate(ROUTES.EVENTS);
          showSnackbar({
            message: "Event was successfully deleted",
            variant: SnackbarVariantType.Success,
          });
        },
      });
    },
    [mutate, navigate, showSnackbar],
  );

  // TODO: add loading
  const controls: ControlPayload[] = [
    {
      color: "primary",
      id: isEditMode ? "btnUpdate" : "btnAdd",
      text: isEditMode ? "Update" : "Add",
      variant: "contained",
      type: "submit",
      disabled: !isFormReallyDirty,
    },
    {
      id: "newEvent.resetEventForm",
      color: "primary",
      onClick: () => reset(),
      text: "Reset",
      variant: "contained",
      disabled: !isFormReallyDirty,
    },
    {
      id: "event.cancelEventCreation",
      color: "primary",
      onClick: () => navigate(-1),
      text: "Cancel",
      variant: "outlined",
    },
  ];

  return (
    <ButtonsLayout controls={controls}>
      <ButtonWithConfirmDialog
        data-testid="delete-event"
        variant="outlined"
        color="error"
        buttonTitle="Delete"
        tooltip="Delete Event"
        customDialogTitle="Confirm Deletion"
        dialogContent="You are about to delete the event permanently. Proceed?"
        onConfirm={() => deleteEvent(slug)}
      />
    </ButtonsLayout>
  );
};

export default memo(EventActionButtons);
