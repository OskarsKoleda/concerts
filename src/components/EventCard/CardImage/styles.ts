import { horizontallyCenteredStyles } from "../../../common/styles";

import type { SxProps } from "@mui/system";

export const cardImageStyles: SxProps = {
  flexShrink: 0,
  width: "30%",
  objectFit: "cover",
};

export const noPosterStyles: SxProps = {
  ...cardImageStyles,
  ...horizontallyCenteredStyles,
  justifyContent: "center",
  bgcolor: "grey.200",
};
