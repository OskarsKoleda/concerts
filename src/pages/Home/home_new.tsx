import { Container, Box, Typography, Grid, Paper } from "@mui/material";
import { NavLinkButton } from "../../components/NavButton/navButton_new";

export const HomePage = (): JSX.Element => {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Website
        </Typography>
        <Typography variant="h6" component="p" color="textSecondary">
          Discover amazing features and content designed to help you.
        </Typography>
      </Box>

      <Box textAlign="center" mb={4}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <NavLinkButton variant="contained" color="primary" to="concert-list">
              {"View Concerts"}
            </NavLinkButton>
          </Grid>
          <Grid item>
            <NavLinkButton variant="contained" color="secondary" to="/concert/new">
              {"Add Concert"}
            </NavLinkButton>
          </Grid>
        </Grid>
      </Box>

      <Box mb={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          About Our Site
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="body1" component="p">
            Our site offers a variety of features to help you manage your tasks efficiently. Whether
            you're looking for productivity tools, informative articles, or community support, we
            have it all.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};
