import { observer } from "mobx-react-lite";
import { Grid, Button, Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { InputField } from "../../../../../components/InputField/inputField";
import { POSTER_URL_VALIDATION_RULES } from "./constants";
import { formContainerStyle } from "./styles";
import { useNavigate } from "react-router-dom";

export const ConcertCreationForm: React.FC = observer(function ConcertCreationForm(): JSX.Element {
  const { control } = useFormContext();
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <Box sx={formContainerStyle}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputField
            control={control}
            fullWidth={true}
            controlName="band"
            label="Band Name"
            type="string"
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            control={control}
            fullWidth={true}
            controlName="city"
            label="City"
            type="string"
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            control={control}
            fullWidth={true}
            controlName="year"
            label="Year"
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            control={control}
            fullWidth={true}
            controlName="url"
            rules={POSTER_URL_VALIDATION_RULES}
            label="Poster URL"
            type="string"
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
        <Button type="button" variant="contained" color="secondary">
          Reset
        </Button>
        <Button type="button" variant="text" onClick={goBack}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
});
