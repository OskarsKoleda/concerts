import { observer } from "mobx-react-lite";
import { Grid, Button, Box } from "@mui/material";
import InputField from "../../../../components/InputField/inputField";

export const ConcertCreationForm: React.FC = observer(function ConcertCreationForm(): JSX.Element {
  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputField name="band" label="Band Name" type="string" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name="city" label="City" type="string" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name="year" label="Year" type="number" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name="poster" label="Poster URL" type="string" fullWidth />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
        <Button type="button" variant="contained" color="secondary">
          Reset
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => console.log("Cancel button clicked")}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
});
