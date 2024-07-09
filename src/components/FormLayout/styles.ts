import type { SxProps, Theme } from "@mui/material";

export const gridStyles: SxProps<Theme> = {
    marginTop: 0,
};

export const layoutWrapperStyles: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // "&:last-of-type": {
    //     marginBottom: 0,
    // },
};
