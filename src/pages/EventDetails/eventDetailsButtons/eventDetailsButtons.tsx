import type { FC } from "react";
import { memo, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ButtonsLayout } from "../../../components/ButtonsLayout/buttonsLayout";
import { ROUTE_LIST } from "../../../router/routes";
import type { LocalEventData } from "../../../common/types/eventTypes.ts";
import type { ControlPayload } from "../../../components/ButtonsLayout/types";

type ControlButtonsProps = {
  readOnly: boolean;
  isEditMode: boolean;
  onEditClick: () => void;
};

export const EventDetailsButtons: FC<ControlButtonsProps> = memo(function EventDetailsButtons({
  onEditClick,
  readOnly,
  isEditMode,
}) {
  const {
    reset,
    formState: { dirtyFields },
  } = useFormContext<LocalEventData>();

  const navigate = useNavigate();
  const isFormReallyDirty = Object.keys(dirtyFields).length > 0;

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  const handleReturnFromDetails = useCallback(() => {
    navigate(ROUTE_LIST.HOMEPAGE);
  }, [navigate]);

  const handleCancelCreation = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const controls: ControlPayload[] = [
    {
      color: "primary",
      id: isEditMode ? "btnUpdate" : "btnAdd",
      text: isEditMode ? "Update" : "Add",
      variant: "contained",
      type: "submit",
      visible: !readOnly,
      disabled: !isFormReallyDirty,
    },
    {
      color: "primary",
      text: "Edit",
      variant: "contained",
      onClick: onEditClick,
      type: "button",
      visible: readOnly,
    },
    {
      id: "newEvent.resetEventForm",
      color: "primary",
      onClick: handleReset,
      text: "Reset",
      variant: "contained",
      visible: !readOnly,
      disabled: !isFormReallyDirty,
    },
    {
      id: "event.cancelEventCreation",
      color: "primary",
      onClick: handleCancelCreation,
      text: "Cancel",
      variant: "outlined",
      visible: !readOnly,
    },
    {
      id: "event.returnFromDetails",
      color: "primary",
      onClick: handleReturnFromDetails,
      text: "Back",
      variant: "outlined",
      visible: readOnly,
    },
  ];

  return <ButtonsLayout controls={controls} showDelete={isEditMode || readOnly} />;
});
