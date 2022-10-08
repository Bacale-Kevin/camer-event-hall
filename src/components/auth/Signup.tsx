import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Layout from "../../layouts/layout/Layout";
import Link from "next/link";

const Background = styled(Box)({
  backgroundImage: "url('/images/Sprinkle.svg')",
  height: "94vh",
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(2, "please enter your name").max(25, "name to long"),
  email: Yup.string().required("please enter your email").email(),
  password: Yup.string().required("please enter your password").min(6, "password should be atlist 6 characters long"),
  confirmPassword: Yup.string()
    .required("please confirm password")
    .oneOf([Yup.ref("password"), null], "password does not match"),
});

type signUpFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<signUpFormInputs>({ resolver: yupResolver(validationSchema), mode: "all" });

  /********** TOGGLE PASSWORD **********/
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const onSubmitHandler: SubmitHandler<signUpFormInputs> = (data) => {};

  return (
    <Layout title="Create Account">
      <Background>
        <Container maxWidth="xs" sx={{ height: "100%" }}>
          <Grid container alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
            <Grid item xs={12}>
              <Paper sx={{ py: 4, px: 4, pb: 8 }}>
                <Typography color="text.secondary" fontFamily="Poppins">
                  Welcome!
                </Typography>
                <Typography variant="h3">Signup to create an account</Typography>
                <Stack>
                  <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandler)}>
                    <Stack sx={{ mt: 5 }} spacing={2}>
                      {/* name */}

                      <TextField
                        {...register("name")}
                        autoFocus
                        id="standard-basic"
                        label="Full Name"
                        variant="outlined"
                        size="small"
                        helperText={errors.name?.message}
                        error={errors.name ? true : false}
                      />
                      {/* email */}

                      <TextField
                        {...register("email")}
                        id="standard-basic"
                        label="Email"
                        variant="outlined"
                        size="small"
                        helperText={errors.email?.message}
                        error={errors.email ? true : false}
                      />
                      {/* password */}

                      <FormControl>
                        <InputLabel size="small">Password</InputLabel>
                        <OutlinedInput
                          {...register("password")}
                          error={errors.password ? true : false}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          label="Password"
                          fullWidth
                          size="small"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="small"
                              >
                                {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText error={errors.password ? true : false}>
                          {errors.password?.message}
                        </FormHelperText>
                      </FormControl>
                      {/* confirm password */}

                      <FormControl>
                        <InputLabel htmlFor="confirm-password" size="small">
                          Confirm Password
                        </InputLabel>
                        <OutlinedInput
                          {...register("confirmPassword")}
                          error={errors.confirmPassword ? true : false}
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          label="confirm Password"
                          fullWidth
                          size="small"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="small"
                              >
                                {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText error={errors.confirmPassword ? true : false}>
                          {errors.confirmPassword?.message}
                        </FormHelperText>
                      </FormControl>
                      {/* submit button */}

                      <Button type="submit" variant="contained">
                        Sign Up
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Box component={Link} href="/auth/login">
                            <Box
                              component="a"
                              sx={{
                                textDecoration: "underline",
                                cursor: "pointer",
                                color: "#1976d2",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {"Already have an account?  Login"}
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Background>
    </Layout>
  );
};

export default Signup;
