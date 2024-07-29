import type { ControlPayload } from "../../../components/ButtonsLayout/types";
import { ButtonsLayout } from "../../../components/ButtonsLayout/buttonsLayout";
import { useFormContext } from "react-hook-form";
import type { ConcertData } from "../../../common/types/concert";
import type { FC } from "react";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_LIST } from "../../../router/routes";

interface ControlButtonsProps {
  readOnly: boolean;
  isEditMode: boolean;
  onEditClick: () => void;
}

export const NewConcertControlButtons: FC<ControlButtonsProps> = memo(
  function NewConcertControlButtons({ onEditClick, readOnly, isEditMode }) {
    const {
      reset,
      // getValues,
      formState: { isDirty },
    } = useFormContext<ConcertData>();
    const navigate = useNavigate();

    const handleReset = useCallback(() => {
      reset();
    }, [reset]);

    const handleCancel = () => {
      navigate(ROUTE_LIST.HOMEPAGE);
    };

    // const logData = () => {
    //   console.log(getValues());
    // };

    const controls: ControlPayload[] = [
      {
        color: "primary",
        id: isEditMode ? "btnUpdate" : "btnAdd",
        text: isEditMode ? "Update" : "Add",
        variant: "contained",
        type: "submit",
        visible: !readOnly,
        disabled: !isDirty,
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
        disabled: !isDirty,
      },
      {
        id: "newConcert.cancelConcertCreation",
        color: "primary",
        onClick: handleCancel,
        text: "Cancel",
        variant: "contained",
      },
      // {
      //   id: "log",
      //   color: "error",
      //   onClick: logData,
      //   text: "Log Data",
      //   variant: "outlined",
      //   visible: false,
      // },
    ];

    return <ButtonsLayout controls={controls} />;
  },
);
