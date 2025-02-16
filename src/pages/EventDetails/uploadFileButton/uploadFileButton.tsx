import Button from "@mui/material/Button";
import { useMemo, useRef } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../store/StoreContext.tsx";
import { uploadFileButtonStyles } from "./styles.ts";

type UploadFileButtonProps<T extends FieldValues> = {
  buttonTitle: string;
  formFieldName: Path<T>;
  register: UseFormRegister<T>;
  readonly: boolean;
};

export const UploadFileButton = observer(
  <T extends FieldValues>({
    buttonTitle,
    formFieldName,
    register,
    readonly,
  }: UploadFileButtonProps<T>) => {
    const {
      eventDetailsUIStore: { eventPosterName },
    } = useRootStore();

    const selectedImage = useWatch({ name: formFieldName });
    const { ref, ...rest } = register(formFieldName, { required: false });
    const fileInput = useRef<HTMLInputElement | null>(null);
    const triggerFileInput = () => fileInput.current?.click();

    const posterTitle = useMemo(() => {
      return readonly
        ? eventPosterName
        : selectedImage && selectedImage.length > 0 && selectedImage[0].name;
    }, [eventPosterName, selectedImage]);

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
        <Typography variant="caption">{posterTitle}</Typography>
      </Box>
    );
  },
);
