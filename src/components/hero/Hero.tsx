import React, { useState } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  styled,
  FormControl,
  InputLabel,
  Button,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const Background = styled(Box)({
  backgroundImage: "url('/images/Sprinkle.svg')",
  height: "45rem",
});

const Hero: React.FC = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Background>
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Grid container alignItems="center" sx={{ height: "100%" }}>
          <Container maxWidth="md">
            <Grid item xs={12}>
              <Typography variant="h1" align="center" color="white" sx={{ textTransform: "capitalize" }}>
                The easiest way to find and book venues in cameroon
              </Typography>
            </Grid>
          </Container>
          <Grid item xs={12}>
            <Container component={Paper} maxWidth="md">
              <Grid container alignItems="center" justifyContent="center" spacing={2}>
                <Grid item md={5}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: "100%" }}>
                    <InputLabel id="demo-simple-select-standard-label-type">Event Type</InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-standard-label-type"
                      id="demo-simple-select-standard"
                      value={age}
                      onChange={handleChange}
                      label="Age"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={5}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: "100%" }}>
                    <InputLabel id="demo-simple-select-standard-label-city">City</InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-standard-label-city-label"
                      id="demo-simple-select-standard-city"
                      value={age}
                      onChange={handleChange}
                      label="Age"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={2}>
                  <Button variant="contained" fullWidth startIcon={<SearchIcon />}>
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Background>
  );
};

export default Hero;
