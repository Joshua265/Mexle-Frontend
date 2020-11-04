import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router";

import { TextField, Button, Paper, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useUserStore } from "context/UserContext";

const useStyles = makeStyles((th) => ({
  root: {
    margin: "auto",
    width: "30%",
    padding: "20px",
    "& > *": {
      margin: th.spacing(1),
      width: "25ch",
    },
  },
  box: {
    padding: "20px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  buttonContainer: {
    padding: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

function LoginPage() {
  const classes = useStyles();
  const userStore = useUserStore();
  let history = useHistory();
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  const handleLogin = () => {
    userStore.login(username, password);

    history.push("/");
  };

  return (
    <form className={classes.root}>
      <Paper variant="outlined" className={classes.box}>
        <TextField
          label="Username"
          autoFocus
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="text"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={classes.buttonContainer}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
          {/* <Link className="whiteLink">
            <Button variant="contained" color='primary'>Sign Up</Button>
          </Link> */}
        </div>
      </Paper>
    </form>
  );
}

export default LoginPage;
