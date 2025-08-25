import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import type { LocalEventData } from "../../../../common/types/eventTypes.ts";
import ButtonsLayout from "../../../../components/ButtonsLayout/ButtonsLayout.tsx";
import type { ControlPayload } from "../../../../components/ButtonsLayout/types.ts";

interface EventActionButtonsProps {
  isEditMode: boolean;
}

export const EventActionButtons = ({ isEditMode }: EventActionButtonsProps) => {
  const {
    reset,
    formState: { dirtyFields },
  } = useFormContext<LocalEventData>();

  const navigate = useNavigate();
  const isFormReallyDirty = Object.keys(dirtyFields).length > 0;

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

  return <ButtonsLayout controls={controls} renderDeleteButton={isEditMode} />;
};

export default memo(EventActionButtons);
