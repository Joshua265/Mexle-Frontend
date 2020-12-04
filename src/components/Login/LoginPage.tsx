import React, { useState, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import qs from "qs";
import Cookie from "universal-cookie";

import {
  TextField,
  Button,
  Link,
  Container,
  Grid,
  Avatar,
  Backdrop,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { useRootStore } from "context/RootStateContext";
import webServiceProvider from "helpers/webServiceProvider";
import { useSnackbar } from "notistack";

const cookie = new Cookie();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    display: "flex",
    justifyContent: "space-between",
  },
}));

function LoginPage() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { userStore } = useRootStore();
  const history = useHistory();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    if (!userStore.loggedIn && !loggingIn) {
      autoLogin();
    }
  }, []);

  const autoLogin = async () => {
    try {
      setLoggingIn(true);
      const token = cookie.get("token");
      await userStore.verifyToken(token);

      enqueueSnackbar("You have been logged in automatically!", {
        variant: "success",
      });
      setLoggingIn(false);
      history.push(
        qs.parse(location.search, { ignoreQueryPrefix: true }).path || "/"
      );
    } catch {
      setLoggingIn(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await webServiceProvider.post("user/login", {
        username,
        password,
      });
      userStore.login(userData.userData, userData.token);
      history.push(
        qs.parse(location.search, { ignoreQueryPrefix: true }).path || "/"
      );
      console.log(userData);
    } catch (e) {
      console.log(e);
      enqueueSnackbar("Wrong Username or Password!", { variant: "error" });
    }
  };

  if (loggingIn) {
    return <Backdrop open />;
  }

  if (userStore.loggedIn) {
    return <Redirect to="/account" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Username"
                autoFocus
                type="text"
                required
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="password"
                label="Password"
                type="password"
                id="password"
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.submit}>
                <Button variant="contained" color="primary" type="submit">
                  Login
                </Button>
                <Link href="/signup" className="whiteLink">
                  <Button variant="contained" color="primary">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LoginPage;
