import { observer } from "mobx-react-lite";
import { ControlPayload } from "../../../components/ButtonsLayout/types";
import { ButtonsLayout } from "../../../components/ButtonsLayout/buttonsLayout";
import { useFormContext } from "react-hook-form";
import { ConcertData } from "../../../common/types/concert";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_LIST } from "../../../router/routes";

export const NewConcertControlButtons: React.FC = observer(function NewConcertControlButtons() {
  const { reset, getValues } = useFormContext<ConcertData>();
  const navigate = useNavigate();

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  const handleCancel = () => {
    navigate(ROUTE_LIST.HOMEPAGE);
  };

  const logData = () => {
    console.log(getValues());
  };

  const controls: ControlPayload[] = [
    {
      id: "newConcert.addConcert",
      color: "primary",
      text: "Add",
      variant: "contained",
      type: "submit",
    },
    {
      id: "newConcert.resetConcertForm",
      color: "primary",
      onClick: handleReset,
      text: "Reset",
      variant: "contained",
    },
    {
      id: "newConcert.cancelConcertCreation",
      color: "primary",
      onClick: handleCancel,
      text: "Cancel",
      variant: "contained",
    },
    {
      id: "log",
      color: "error",
      onClick: logData,
      text: "Log Data",
      variant: "outlined",
    },
  ];

  return <ButtonsLayout controls={controls} />;
});
