import { Box, Button, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar";
import { useRootStore } from "../../store/StoreContext";
import { CustomDialog } from "../CustomDialog/customDialog";
import { SnackbarVariantType } from "../../common/enums/appEnums.ts";
import { ROUTE_LIST } from "../../router/routes.ts";

export const DeleteConcertButton: React.FC = observer(() => {
  const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false);
  const {
    eventDetailsStore: { deleteEvent, currentEventId: eventId },
  } = useRootStore();

  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();

  const handleConcertDeletion = useCallback(
    async (eventId: string) => {
      const response = await deleteEvent(eventId);
      setShowConfirmationDialogue(false);

      if (!response) {
        return;
      }

      showSnackbar({
        message: `${response} was successfully deleted`,
        variant: SnackbarVariantType.SUCCESS,
      });
      navigate(`/${ROUTE_LIST.EVENTS}`);
    },
    [deleteEvent, navigate, showSnackbar],
  );

  const handleDeletion = () => {
    setShowConfirmationDialogue(true);
  };

  return (
    <Box>
      <CustomDialog
        setShow={setShowConfirmationDialogue}
        show={showConfirmationDialogue}
        title="Are you sure?"
        description="You are about to delete the event permanently. Proceed?"
        onConfirm={() => handleConcertDeletion(eventId)}
      />
      <Tooltip title="Delete Event">
        <Button
          id="event.deleteEvent"
          variant="outlined"
          color="error"
          onClick={() => handleDeletion()}
        >
          Delete
        </Button>
      </Tooltip>
    </Box>
  );
});
