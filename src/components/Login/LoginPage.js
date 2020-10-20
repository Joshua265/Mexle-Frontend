import React from 'react';

import { TextField, Button, Paper } from '@material-ui/core';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((th) => ({
  root: {
    margin: 'auto',
    width: '30%',
    padding: '20px',
    '& > *': {
      margin: th.spacing(1),
      width: '25ch',
    },
  },
  box: {
    padding: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    padding: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

function LoginPage() {
  const classes = useStyles();
  return (
    <form className={classes.root}>
      <Paper variant='outlined' className={classes.box} >
        <TextField label="Username" autoFocus type="text" />
        <TextField label="Password" type="text" />
        <div className={classes.buttonContainer}>
          <Button variant="contained" color='primary'>Login</Button>
          <Button variant="contained" color='primary'>Sign Up</Button>
        </div>

      </Paper>
    </form>


  )

}

export default LoginPage;