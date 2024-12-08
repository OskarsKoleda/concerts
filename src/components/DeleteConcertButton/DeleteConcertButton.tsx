import { Box, Button, Tooltip } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SnackbarVariantType } from "../../common/enums/appEnums";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar";
import { ROUTE_LIST } from "../../router/routes";
import { useRootStore } from "../../store/StoreContext";
import { CustomDialog } from "../CustomDialog/customDialog";

export const DeleteConcertButton: React.FC = observer(() => {
  const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false);
  const {
    concertDetailsStore: { deleteConcert, currentConcertId: concertId },
  } = useRootStore();

  const navigate = useNavigate();
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
        navigate(`/${ROUTE_LIST.CONCERTS}`);
      } else {
        showSnackbar({ message, variant: SnackbarVariantType.ERROR });
      }
    },
    [deleteConcert, navigate, showSnackbar],
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
