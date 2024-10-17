import { Box, Button, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";

import { SnackbarVariantType } from "../../common/enums/appEnums";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar";
import { useRootStore } from "../../store/StoreContext";
import { CustomDialog } from "../CustomDialog/customDialog";

export const DeleteConcertButton: React.FC = observer(() => {
  const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false);
  const {
    concertDetailsStore: { deleteConcert, currentConcertId: concertId },
  } = useRootStore();

  const { showSnackbar } = useCustomSnackbar();
  const handleConcertDeletion = useCallback(
    async (concertId: string) => {
      const { status, message } = await deleteConcert(concertId);
      setShowConfirmationDialogue(false);

      if (status === "OK") {
        showSnackbar({
          message,
          variant: SnackbarVariantType.SUCCESS,
        });
      } else {
        showSnackbar({ message, variant: SnackbarVariantType.ERROR });
      }
    },
    [deleteConcert, setShowConfirmationDialogue, showSnackbar],
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
        description="You are about to delete the concert permanently. Proceed?"
        onConfirm={() => handleConcertDeletion(concertId)}
      />
      <Tooltip title="Delete Event">
        {/* <Box marginLeft="1rem">
          <IconButton size="small" onClick={handleDeletion}>
            <DeleteIcon />
          </IconButton>
        </Box> */}
        <Button
          id="concert.deleteConcert"
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
