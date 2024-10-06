import { useFormContext } from "react-hook-form";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { ButtonsLayout } from "../../../components/ButtonsLayout/buttonsLayout";
import { ROUTE_LIST } from "../../../router/routes";

import type { FC } from "react";
import type { ConcertData } from "../../../common/types/concert";
import type { ControlPayload } from "../../../components/ButtonsLayout/types";

interface ControlButtonsProps {
  readOnly: boolean;
  isEditMode: boolean;
  onEditClick: () => void;
}

export const NewConcertControlButtons: FC<ControlButtonsProps> = memo(
  function NewConcertControlButtons({ onEditClick, readOnly, isEditMode }) {
    const {
      reset,
      formState: { dirtyFields },
    } = useFormContext<ConcertData>();
    const navigate = useNavigate();
    const isFormReallyDirty = Object.keys(dirtyFields).length > 0;

    const handleReset = useCallback(() => {
      reset();
    }, [reset]);

    const handleCancel = useCallback(() => {
      navigate(ROUTE_LIST.HOMEPAGE);
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
        id: "newConcert.resetConcertForm",
        color: "primary",
        onClick: handleReset,
        text: "Reset",
        variant: "contained",
        visible: !readOnly,
        disabled: !isFormReallyDirty,
      },
      {
        id: "newConcert.cancelConcertCreation",
        color: "primary",
        onClick: handleCancel,
        text: "Cancel",
        variant: "contained",
      },
    ];

    return <ButtonsLayout controls={controls} />;
  },
);
