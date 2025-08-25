import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useRef } from "react";
import type { Path } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

import type { LocalEventData } from "../../../../common/types/eventTypes.ts";

import { fileUploadContainerStyles, uploadButtonStyles } from "./styles.ts";

interface FileUploadProps {
  buttonTitle: string;
  formFieldName: Path<LocalEventData>;
}

const FileUpload = ({ buttonTitle, formFieldName }: FileUploadProps) => {
  const { control } = useFormContext<LocalEventData>();

  const fileInput = useRef<HTMLInputElement | null>(null);
  const triggerFileInput = () => {
    fileInput.current?.click();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: FileList | null) => void,
  ) => {
    const fileList: FileList | null = event.target.files;

    if (fileList) {
      onChange(fileList);
    }
  };

  return (
    <Box sx={fileUploadContainerStyles}>
      <Controller
        name={formFieldName}
        control={control}
        render={({ field }) => {
          const fileList = field.value as FileList | null;
          const fileName = fileList && fileList.length > 0 ? fileList[0].name : "No file chosen";

          return (
            <>
              <Button
                sx={uploadButtonStyles}
                variant="contained"
                size="small"
                onClick={triggerFileInput}
              >
                {buttonTitle}
              </Button>
              <Typography variant="caption">{fileName}</Typography>
              <input
                type="file"
                hidden
                onChange={(e) => handleChange(e, field.onChange)}
                ref={(e) => {
                  field.ref(e);
                  fileInput.current = e;
                }}
              />
            </>
          );
        }}
      />
    </Box>
  );
};

export default FileUpload;
