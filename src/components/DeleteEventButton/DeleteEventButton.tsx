import { Box, Button, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SnackbarVariantType } from "../../common/enums/appEnums.ts";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar";
import { ROUTE_LIST } from "../../router/routes.ts";
import { useRootStore } from "../../store/StoreContext";
import CustomDialog from "../CustomDialog/CustomDialog.tsx";

export const DeleteEventButton = observer(() => {
  const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false);
  const {
    eventDetailsRequestStore: { deleteEvent },
    eventDetailsUIStore: { currentEventId },
  } = useRootStore();

  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();

  const handleEventDeletion = useCallback(
    async (eventId: string) => {
      const response = await deleteEvent(eventId);

      setShowConfirmationDialogue(false);

      if (!response) {
        return;
      }

      navigate(ROUTE_LIST.EVENTS);
      showSnackbar({
        message: `${response} was successfully deleted`,
        variant: SnackbarVariantType.SUCCESS,
      });
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
        proceedButtonColor="error"
        content="You are about to delete the event permanently. Proceed?"
        onConfirm={() => handleEventDeletion(currentEventId)}
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
