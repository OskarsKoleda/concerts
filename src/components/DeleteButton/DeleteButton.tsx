import { useCallback, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { observer } from "mobx-react-lite";

import { CustomDialog } from "../CustomDialog/customDialog";
import { useRootStore } from "../../store/StoreContext";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";

export const DeleteButton: React.FC<{ concertId: string }> = observer(({ concertId }) => {
  const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false);

  const {
    concertsStore: { deleteConcert },
  } = useRootStore();

  const { showSnackbar } = useCustomSnackbar();

  const handleConcertDeletion = useCallback(
    async (concertId: string) => {
      const { status, message } = await deleteConcert(concertId);
      setShowConfirmationDialogue(false);

      if (status === "OK") {
        showSnackbar({
          message,
          variant: "success",
        });
      } else {
        showSnackbar({ message, variant: "error" });
      }
    },
    [deleteConcert, setShowConfirmationDialogue, showSnackbar],
  );

  const handleDeletion = () => {
    setShowConfirmationDialogue(true);

    return;
  };

  return (
    <Box>
      <CustomDialog
        setShow={setShowConfirmationDialogue}
        show={showConfirmationDialogue}
        title="Are you sure?"
        description={"You are about to delete the concert permanently. Proceed?"}
        onConfirm={() => handleConcertDeletion(concertId)}
      />
      <Tooltip title="Delete">
        <Box marginLeft="1rem">
          <IconButton size="small" onClick={handleDeletion}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Tooltip>
    </Box>
  );
});
