import { ButtonProps } from "@mui/material/Button";
import { useState } from "react";
import { CustomDialog } from "../CustomDialog/customDialog";
import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// type CustomButtonProps = ButtonProps & {
//   children: React.ReactNode;
// };

export const DeleteButton: React.FC<{ concert: string }> = ({ concert }) => {
  const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false);

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
        description={`You are about to delete ${concert}`}
      />
      <Tooltip title="Delete">
        <Box marginLeft="1rem">
          <IconButton size="large" onClick={handleDeletion}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Tooltip>
    </Box>
  );
};
