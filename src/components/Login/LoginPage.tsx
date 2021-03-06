import React, { useState, useContext } from 'react';
import { Redirect, useLocation, Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import qs from 'qs';

import {
  TextField,
  Button,
  Paper,
  Grid,
  Avatar,
  Typography,
  Link as MuiLink
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useSnackbar } from 'notistack';
import { RootStoreContext } from 'stores/RootStore';
import Background from 'images/circuit.png';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    height: `calc(100vh - ${48 + 64}px)`
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

function LoginPage() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { userStore } = useContext(RootStoreContext);
  const { userData } = userStore;
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await userStore.login(username, password);
      history.push(
        String(
          qs.parse(location.search, { ignoreQueryPrefix: true }).path || '/'
        )
      );
    } catch (e) {
      console.log(e);
      enqueueSnackbar(e.message, { variant: 'error' });
    }
  };

  if (userData.loggedIn) {
    return <Redirect to="/account" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
                <MuiLink>Forgot password?</MuiLink>
              </Grid>

              <Grid item xs={12}>
                <div className={classes.submit}>
                  <Button variant="contained" color="primary" type="submit">
                    Login
                  </Button>
                  <Link to="/signup" className="whiteLink">
                    <Button variant="contained" color="primary">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
