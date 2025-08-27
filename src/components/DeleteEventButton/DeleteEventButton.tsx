import { Box, Button, Tooltip } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDeleteEvent } from "../../api/useDeleteEvent.ts";
import { SnackbarVariantType } from "../../common/enums/appEnums.ts";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import { ROUTES } from "../../router/routes.ts";
import CustomDialog from "../CustomDialog/CustomDialog.tsx";

const DeleteEventButton = () => {
  const [showDialog, setShowDialog] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  const { mutate } = useDeleteEvent();

  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();

  const handleEventDeletion = useCallback(
    async (slug?: string) => {
      if (!slug) {
        return;
      }

      mutate(slug, {
        onSuccess: () => {
          setShowDialog(false);
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

  return (
    <Box>
      <CustomDialog
        setShow={setShowDialog}
        show={showDialog}
        title="Are you sure?"
        proceedButtonColor="error"
        content="You are about to delete the event permanently. Proceed?"
        onConfirm={() => handleEventDeletion(slug)}
      />
      <Tooltip title="Delete Event">
        <Button
          id="event.deleteEvent"
          variant="outlined"
          color="error"
          onClick={() => setShowDialog(true)}
        >
          Delete
        </Button>
      </Tooltip>
    </Box>
  );
};

export default DeleteEventButton;
