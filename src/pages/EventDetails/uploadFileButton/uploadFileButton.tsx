import Button from "@mui/material/Button";
import { useRef } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { uploadFileButtonStyles } from "./styles.ts";

type UploadFileButtonProps<T extends FieldValues> = {
  buttonTitle: string;
  formFieldName: Path<T>;
  formMethods: UseFormReturn<T>;
  readonly: boolean;
};

export const UploadFileButton = <T extends FieldValues>({
  buttonTitle,
  formFieldName,
  formMethods,
  readonly,
}: UploadFileButtonProps<T>) => {
  const { register } = formMethods;
  const selectedImage = useWatch({ name: formFieldName });

  const { ref, ...rest } = register(formFieldName, { required: false });
  const fileInput = useRef<HTMLInputElement | null>(null);
  const triggerFileInput = () => fileInput.current?.click();

  return (
    <Box display="flex" alignItems="baseline">
      {!readonly && (
        <Button
          sx={uploadFileButtonStyles}
          variant="contained"
          size="small"
          onClick={triggerFileInput}
        >
          {buttonTitle}
        </Button>
      )}

      <input
        type="file"
        {...rest}
        ref={(e) => {
          ref(e);
          fileInput.current = e;
        }}
        style={{ display: "none" }}
      />
      {selectedImage && selectedImage.length > 0 && (
        <Typography variant="caption">{selectedImage[0].name}</Typography>
      )}
    </Box>
  );
};
