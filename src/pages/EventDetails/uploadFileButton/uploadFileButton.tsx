import Button from "@mui/material/Button";
import React, { useRef } from "react";
import type { Path } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../store/StoreContext.tsx";
import type { LocalEventData } from "../../../common/types/eventTypes.ts";
import { uploadFileButtonStyles } from "./styles.ts";

type UploadFileButtonProps = {
  buttonTitle: string;
  formFieldName: Path<LocalEventData>;
  readonly: boolean;
};

export const UploadFileButton = observer(
  ({ buttonTitle, formFieldName, readonly }: UploadFileButtonProps) => {
    const {
      eventDetailsUIStore: { setPosterTitle },
    } = useRootStore();

    const { control } = useFormContext<LocalEventData>();

    const fileInput = useRef<HTMLInputElement | null>(null);
    const triggerFileInput = () => fileInput.current?.click();

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      onChange: (value: FileList | null) => void,
    ) => {
      const fileList: FileList | null = event.target.files;

      if (fileList) {
        setPosterTitle(fileList[0].name);
        onChange(fileList);
      }
    };

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

        <Controller
          name={formFieldName}
          control={control}
          render={({ field }) => (
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) => handleChange(e, field.onChange)}
              ref={(e) => {
                field.ref(e);
                fileInput.current = e;
              }}
            />
          )}
        />
      </Box>
    );
  },
);
