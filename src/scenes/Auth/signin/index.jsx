import * as React from "react";
import {
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import style from "./sign.module.css";
import AppConstant from "../../../utils/app-constants";
import { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Audio, ColorRing } from "react-loader-spinner";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Aarvy Technologies
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(false);
  const [otpPage, setOtpPage] = useState(false);
  let history = useNavigate();
  const [otp, setOtp] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOtpChange = (newValue) => {
    setOtp(newValue);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      setOpen(true);
      const data = await axios({
        method: "POST",
        url: `${AppConstant.apibaseURL}/login`,
        data: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.status === 201) {
        localStorage.setItem("usersdata", data.data.result.token);
        localStorage.setItem("usersId", data.data.result.userValid._id);
        toast.success("Login Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // setTimeout(() => {

        window.location.reload();
        setOpen(false);
        history("/");
        // }, 1000);
      }
      if (data.status === 200) {
        setOpen(false);
        toast(data.data.error, {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: style.toastMessage,
        });
      }
    } catch (error) {
      setOpen(false);
    }
  };

  const handleChange = () => {
    setContent(true);
    setOtpPage(false);
  };
  const handlePasswordChange = () => {
    setContent(false);
    setOtpPage(false);
  };
  const openOtp = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const re = { email: data.get("email") };
    setOtpPage(true);
    document.getElementById("otp").style.display = "none";
    document.getElementById("withPassword").style.display = "none";

    try {
      setOpen(true);
      const data = await axios({
        method: "POST",
        url: `${AppConstant.apibaseURL}/login-1`,
        data: JSON.stringify(re),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.status === 201) {
        toast.info(data?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {}
  };
  const img = "url(https://source.unsplash.com/random?wallpapers)";

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const data = await axios({
        method: "POST",
        url: `${AppConstant.apibaseURL}/login-2`,
        data: JSON.stringify({ otp: otp }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.status === 201) {
        console.log("data", data.data.data.token);
        localStorage.setItem("usersdata", data?.data?.data?.token);
        localStorage.setItem("usersId", data?.data?.data?.data?._id);
        toast.success("Login Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.reload();
        setOpen(false);
        history("/");
        // setTimeout(() => {

        // }, 1000);
      }
    } catch (error) {}
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid
          container
          component="main"
          sx={{ height: "100vh" }}
          justifyContent={"center"}
        >
          <CssBaseline />

          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: img,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            {content === false ? (
              <>
                <Box
                  sx={{
                    my: 5,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Log In
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    {open === true ? (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <ColorRing
                          visible={true}
                          height="80"
                          width="80"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={[
                            "#e15b64",
                            "#f47e60",
                            "#f8b26a",
                            "#abbd81",
                            "#849b87",
                          ]}
                        />
                      </div>
                    ) : (
                      <>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="success"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Submit
                        </Button>
                      </>
                    )}
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      {/* <Grid item>
                        <Link href="/signup" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid> */}
                    </Grid>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box
                  component="form"
                  noValidate
                  sx={{
                    my: 5,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  id="otp"
                  onSubmit={openOtp}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Log in
                  </Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="warning"
                    sx={{ mt: 3, mb: 2 }}
                    endIcon={<SendIcon />}
                  >
                    Otp Send
                  </Button>
                </Box>
              </>
            )}
            {otpPage === false ? (
              <> </>
            ) : (
              <>
                <Box
                  sx={{
                    marginTop: "12rem",
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h4" sx={{ mt: 3, mb: 2 }}>
                    Login With Pin
                  </Typography>
                  <MuiOtpInput
                    length={6}
                    value={otp}
                    onChange={handleOtpChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={sendOtp}
                  >
                    Submit
                  </Button>
                </Box>
              </>
            )}
            {content === false ? (
              <>
                {/* <Box
                  sx={{
                    my: 5,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Grid container>
                    <Grid item xs>
                      <Typography
                        component="h6"
                        variant="h6"
                        sx={{ textAlign: "center" }}
                      >
                        OR
                      </Typography>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, px: 5 }}
                        onClick={handleChange}
                      >
                        Request Otp
                      </Button>
                    </Grid>
                  </Grid>
                </Box> */}
              </>
            ) : (
              <>
                <Box
                  sx={{
                    my: 5,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  id="withPassword"
                >
                  <Grid container>
                    <Grid item xs>
                      <Typography
                        component="h6"
                        variant="h6"
                        sx={{ textAlign: "center" }}
                      >
                        OR
                      </Typography>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, px: 5 }}
                        onClick={handlePasswordChange}
                      >
                        Log In With Password
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}

            <Copyright sx={{ mt: 2 }} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
