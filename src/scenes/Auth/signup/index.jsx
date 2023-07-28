<<<<<<< HEAD
import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Typography,
  InputAdornment,
  Button,
  Box,
  Grid,
  Link,
  Avatar,
  CssBaseline,
  TextField,
  IconButton,
} from "@mui/material";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import AppConstants from "../../../utils/app-constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
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

export default function SignUp() {
  let history = useNavigate();
  const [otp, setOtp] = useState();
  const [otpPage, setOtpPage] = useState(false);
  const handleOtpChange = (newValue) => {
    setOtp(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      userName: data.get("fullname"),
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const response = await axios({
        method: "post",
        url: `${AppConstants.apibaseURL}/register`,
        data: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (response?.data?.status === 201) {
        // toast.success("Submit Successfully ", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
        
       // 
        axios({
          method: "POST",
          url: `http://localhost:8009/login-1`,
          data: JSON.stringify({ email: data.get("email") }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setOtpPage(true);
        document.getElementById("otp").style.display = "none";
        // if (data.status === 201) {
        //   toast.info(data?.data?.message, {
        //     position: toast.POSITION.TOP_RIGHT,
        //   });
        //   setOtpPage(true);
        //   document.getElementById("otp").style.display = "none";
        // }
        // setTimeout(() => {
        //   history("/signin");
        // }, 3000);
      }
    } catch (error) {}
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const data = await axios({
        method: "POST",
        url: `${AppConstants.apibaseURL}/login-2`,
        data: JSON.stringify({ otp: otp }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.status === 201) {
        console.log("data", data.data.data.token);
        toast.success("Submit Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.reload();
        history("/");
        // setTimeout(() => {

        // }, 1000);
      }
    } catch (error) {}
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );

        console.log("google", res.data);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
      {otpPage === false ?(<><Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            id="otp"
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  name="fullname"
                  autoComplete="fullname"
                />
                {/* <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                /> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Grid container>
            <Grid item xs>
              <h1 style={{ textAlign: "center" }}>OR</h1>
              <div style={{display:"flex",justifyContent:"center"}}>
              <GoogleLogin 
            onSuccess={(credentialResponse) => {
              console.log("token", credentialResponse.credential);
              var decoded = jwt_decode(credentialResponse.credential);
              console.log(decoded);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
            </div>

            </Grid>
          </Grid>
        
        </Box></>) : (<> <Box
                  sx={{
                    marginTop: "12rem",
                    mx: 0,
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
                </Box></>)}  
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
=======
import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Typography,
  InputAdornment,
  Button,
  Box,
  Grid,
  Link,
  Avatar,
  CssBaseline,
  TextField,
  IconButton,
} from "@mui/material";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import AppConstants from "../../../utils/app-constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
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

export default function SignUp() {
  let history = useNavigate();
  const [otp, setOtp] = useState();
  const [otpPage, setOtpPage] = useState(false);
  const handleOtpChange = (newValue) => {
    setOtp(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      userName: data.get("fullname"),
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const response = await axios({
        method: "post",
        url: `${AppConstants.apibaseURL}/register`,
        data: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (response?.data?.status === 201) {
        // toast.success("Submit Successfully ", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
        
       // 
        axios({
          method: "POST",
          url: `http://localhost:8009/login-1`,
          data: JSON.stringify({ email: data.get("email") }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setOtpPage(true);
        document.getElementById("otp").style.display = "none";
        // if (data.status === 201) {
        //   toast.info(data?.data?.message, {
        //     position: toast.POSITION.TOP_RIGHT,
        //   });
        //   setOtpPage(true);
        //   document.getElementById("otp").style.display = "none";
        // }
        // setTimeout(() => {
        //   history("/signin");
        // }, 3000);
      }
    } catch (error) {}
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const data = await axios({
        method: "POST",
        url: `${AppConstants.apibaseURL}/login-2`,
        data: JSON.stringify({ otp: otp }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.status === 201) {
        console.log("data", data.data.data.token);
        toast.success("Submit Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.reload();
        history("/");
        // setTimeout(() => {

        // }, 1000);
      }
    } catch (error) {}
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );

        console.log("google", res.data);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
      {otpPage === false ?(<><Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            id="otp"
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  name="fullname"
                  autoComplete="fullname"
                />
                {/* <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                /> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Grid container>
            <Grid item xs>
              <h1 style={{ textAlign: "center" }}>OR</h1>
              <div style={{display:"flex",justifyContent:"center"}}>
              <GoogleLogin 
            onSuccess={(credentialResponse) => {
              console.log("token", credentialResponse.credential);
              var decoded = jwt_decode(credentialResponse.credential);
              console.log(decoded);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
            </div>

            </Grid>
          </Grid>
        
        </Box></>) : (<> <Box
                  sx={{
                    marginTop: "12rem",
                    mx: 0,
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
                </Box></>)}  
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
>>>>>>> 6b2f24819b3e72ab1e9794ed5305bf1385bd4d64
