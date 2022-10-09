import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
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
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import Layout from "../../layouts/layout/Layout";
import Link from "next/link";
import { loginFormInputs } from "../../types/user.types";
import { AppDispatch, AppState } from "../../redux/store";
import { loginUser } from "../../redux/features/auth/authActions";

const Background = styled(Box)({
  backgroundImage: "url('/images/Sprinkle.svg')",
  height: "94vh",
});

const validationSchema = Yup.object().shape({
  email: Yup.string().required("please enter your email").email(),
  password: Yup.string().required("please enter your password").min(6, "password should be atlist 6 characters long"),
});

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: AppState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginFormInputs>({ resolver: yupResolver(validationSchema), mode: "all" });

  /********** TOGGLE PASSWORD **********/
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const onSubmitHandler: SubmitHandler<loginFormInputs> = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <Layout title="Create Account">
      <Background>
        <Container maxWidth="xs" sx={{ height: "100%" }}>
          <Grid container alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
            <Grid item xs={12}>
              <Paper sx={{ py: 4, px: 4, pb: 8 }}>
                <Typography color="text.secondary" fontFamily="Poppins">
                  Welcome back!
                </Typography>
                <Typography variant="h3">Login into your account</Typography>
                <Stack>
                  <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandler)}>
                    <Stack sx={{ mt: 5 }} spacing={2}>
                      {/* email */}

                      <TextField
                        {...register("email")}
                        id="standard-basic"
                        autoFocus
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

                      {/* submit button */}

                      <Button type="submit" disabled={loading} variant="contained">
                        Login
                        {loading ? <CircularProgress color="inherit" size="20px" sx={{ ml: 2 }} /> : ""}
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
                              {"Don't have an account?  Sign up"}
                            </Box>
                          </Box>
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
                              {"Forgot password"}
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

export default Login;
