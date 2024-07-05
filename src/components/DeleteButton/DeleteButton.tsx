import { useState } from "react";
import { CustomDialog } from "../CustomDialog/customDialog";
import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRootStore } from "../../store/StoreContext";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import { SNACKBAR_TEXT } from "../../common/constants/appConstant";

export const DeleteButton: React.FC<{ concertId: string }> = ({ concertId }) => {
  const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false);

  const {
    concerts: { deleteConcert, isDeletionSuccessful },
  } = useRootStore();

  const { showSnackbar } = useCustomSnackbar();

  function handleConcertDeletion(concertId: string) {
    deleteConcert(concertId);
    if (isDeletionSuccessful) {
      showSnackbar({ message: SNACKBAR_TEXT.CONCERT_SUCCESSFUL_DELETION, variant: "success" });
    }
  }

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
};
