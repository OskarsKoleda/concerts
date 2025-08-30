import { Box, Button, Tooltip } from "@mui/material";
import { memo, useCallback, useState } from "react";

import CustomDialog from "../CustomDialog/CustomDialog.tsx";

import type { ButtonProps } from "@mui/material";

type ButtonWithConfirmDialogProps = {
  buttonTitle: string;
  customDialogTitle: string;
  dialogContent: string;
  tooltip?: string;
  onConfirm: () => void;
} & Pick<ButtonProps, "id" | "color" | "variant" | "disabled">;

const ButtonWithConfirmDialog = ({
  buttonTitle,
  customDialogTitle,
  dialogContent,
  tooltip,
  onConfirm,
  ...props
}: ButtonWithConfirmDialogProps) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleConfirm = useCallback(() => {
    onConfirm();
    setShowDialog(false);
  }, [onConfirm]);

  return (
    <Box>
      <CustomDialog
        setShow={setShowDialog}
        show={showDialog}
        title={customDialogTitle}
        proceedButtonColor="error"
        content={dialogContent}
        onConfirm={() => handleConfirm()}
      />
      <Tooltip title={tooltip}>
        <Box>
          <Button onClick={() => setShowDialog(true)} {...props}>
            {buttonTitle}
          </Button>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default memo(ButtonWithConfirmDialog);
