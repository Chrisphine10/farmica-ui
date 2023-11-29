import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/auth/AuthProvider";
import { toast } from 'react-toastify';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mvuna.co.ke/">
        Farmica System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.


export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [open, setOpen] = useState(false);

  const redirectPath = location.state?.path || "/";

  const extractUsername = (email) => {
    // Split the email address at the '@' symbol
    const parts = email.split('@');

    // Check if the email is in a valid format
    if (parts.length === 2) {
      // The username is the first part before the '@' symbol
      const username = parts[0];
      return username;
    } else {
      // Handle invalid email format
      console.error('Invalid email format');
      return null;
    }
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const login = extractUsername(data.get("login"));
    if (login === null) {
      toast.error("Email you have provided is invalid.");
    } else {
      var status = await auth.signin(
        data.get("login"),
        data.get("password"),
        data.get("rememberMe") ? true : false
      );
      if (status) {
        setOpenSuccess(true);
        navigate(redirectPath);
      } else {
        setOpenError(true);
        localStorage.clear();
      }
    }
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container component="main" maxWidth="x">
      <CssBaseline />
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={() => setOpenSuccess(false)}
        message="Login Successful"
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      ></Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={2000}
        onClose={() => setOpenError(false)}
        message="Login Failed: Invalid Credentials. Try again"
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      ></Snackbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "300px", marginBottom: "20px" }}
          src="/logo.jpg"
          alt="logo"
        />
        <h1>Sign in</h1>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            label="Email Address"
            name="login"
            margin="normal"
            type="email"
            required
            fullWidth
            autoFocus
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value='true' color="primary" />}
            label="Remember me"
            name="rememberMe"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleOpen}
          >
            {isLoading ? (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
                onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : (
              "Sign In"
            )}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/reset" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
