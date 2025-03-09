import type { FC } from "react";
import { memo, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ButtonsLayout } from "../../../../components/ButtonsLayout/buttonsLayout.tsx";
import { ROUTE_LIST } from "../../../../router/routes.ts";
import type { LocalEventData } from "../../../../common/types/eventTypes.ts";
import type { ControlPayload } from "../../../../components/ButtonsLayout/types.ts";

type ControlButtonsProps = {
  readOnly: boolean;
  isEditMode: boolean;
};

export const EventDetailsButtons: FC<ControlButtonsProps> = memo(function EventDetailsButtons({
  readOnly,
  isEditMode,
}: ControlButtonsProps) {
  const {
    reset,
    formState: { dirtyFields },
  } = useFormContext<LocalEventData>();

  const navigate = useNavigate();
  const isFormReallyDirty = Object.keys(dirtyFields).length > 0;

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
      id: "newEvent.resetEventForm",
      color: "primary",
      onClick: () => reset(),
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
