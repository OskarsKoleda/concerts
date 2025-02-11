import { Box, Button, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar";
import { useRootStore } from "../../store/StoreContext";
import { CustomDialog } from "../CustomDialog/customDialog";

export const DeleteConcertButton: React.FC = observer(() => {
  const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false);
  const {
    eventDetailsStore: { deleteEvent, currentEventId: eventId },
  } = useRootStore();

  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();

  // const handleConcertDeletion = useCallback(
  //   async (eventId: string) => {
  //     const { status, message } = await deleteEvent(eventId);
  //     setShowConfirmationDialogue(false);
  //
  //     if (status === "OK") {
  //       showSnackbar({
  //         message,
  //         variant: SnackbarVariantType.SUCCESS,
  //       });
  //       navigate(`/${ROUTE_LIST.EVENTS}`);
  //     } else {
  //       showSnackbar({ message, variant: SnackbarVariantType.ERROR });
  //     }
  //   },
  //   [deleteEvent, navigate, showSnackbar],
  // );

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
        onConfirm={() => {}}
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
