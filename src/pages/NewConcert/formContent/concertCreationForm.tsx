import { observer } from "mobx-react-lite";
import { Grid, Button, Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { InputField } from "../../../components/InputField/inputField";
import { POSTER_URL_VALIDATION_RULES } from "./constants";
import { buttonsContainerStyle, formContainerStyle } from "./styles";
import { useNavigate } from "react-router-dom";

type FormProps = {
  onReset: () => void;
};

export const ConcertCreationForm: React.FC<FormProps> = observer(function ConcertCreationForm({
  onReset,
}): JSX.Element {
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
      <Box sx={buttonsContainerStyle}>
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
        <Button type="button" variant="outlined" color="primary" onClick={onReset}>
          Reset
        </Button>
        <Button type="button" variant="outlined" onClick={goBack}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
});
