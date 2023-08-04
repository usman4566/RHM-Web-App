import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

const theme = createTheme();

const Login = () => {
  const myStyle = {
    backgroundImage: "url('images/bg1.png')",
    height: "100vh",
    marginTop: "-70px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (email === "" || password === "") {
      setErrormsg("All fields are required!");
      window.alert(errormsg);
    } else {
      console.log(email, password);
      await axios
        .post("https://roadhealthmap.vercel.app/login", {
          email,
          password,
        })
        .then((response) => {
          console.log(response.data.savedAdmin);
          alert("Login Successfully!");
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.savedAdmin)
          );
          localStorage.setItem("authtoken", response.data.token);
          console.log(response.data.token);
          history("/dashboard");
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setErrormsg(error.response.data);
            alert("incorrect password or Email");
          } else if (error.request) {
            console.log(error.request);
            setErrormsg(
              "Netwrok Error. Please check your interenet connection."
            );
          } else {
            console.log("Error", error.message);
            setErrormsg(error.message);
          }
          console.log(error.config);
        });
    }
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [openforgot, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [forgotemail, setForgotEmail] = useState("");
  const handleEmailChange = (event) => {
    setForgotEmail(event.target.value);
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://roadhealthmap.vercel.app/forgotPassword",
        {
          email: forgotemail,
        }
      );
      const { success, message } = response.data;
      if (success) {
        alert("Password reset link sent to your email.");
      } else {
        alert(message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={myStyle}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Box
              sx={{
                marginTop: 8,
                paddingTop: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(2px)",
                padding: "30px",
                textAlign: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "inherit" }}></Avatar>
              <Typography
                component="h1"
                variant="h5"
                style={{ color: "white" }}
              >
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
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
                  variant="filled"
                  onChange={(event) => setEmail(event.target.value)}
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
                  variant="filled"
                  onChange={(event) => setPassword(event.target.value)}
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
                            <FontAwesomeIcon icon={faEyeSlash} />
                          ) : (
                            <FontAwesomeIcon icon={faEye} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="default" />}
                  label="Remember me"
                  style={{ color: "white" }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    backgroundColor: "transparent",
                    textDecoration: "bold",
                  }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      href="#"
                      variant="body2"
                      style={{ color: "white" }}
                      onClick={handleOpen}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
                <Dialog
                  open={openforgot}
                  onClose={handleClose}
                  style={{ backgroundColor: "inherit" }}
                >
                  <DialogTitle>Email Verification</DialogTitle>
                  <DialogContent>
                    <TextField
                      label="Email"
                      variant="outlined"
                      autoComplete="email"
                      fullWidth
                      value={forgotemail}
                      onChange={handleEmailChange}
                      style={{ marginBottom: "16px" }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                      Cancel
                    </Button>
                    <Button
                      onClick={handleEmailSubmit}
                      variant="contained"
                      color="inherit"
                      type="submit"
                    >
                      Send
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Box>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
};
export default Login;
