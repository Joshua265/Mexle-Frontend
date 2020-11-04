import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Switch,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { useUserStore } from "context/UserContext";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "relative",
    flexGrow: 1,
    zIndex: 1400,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();
  const userStore = useUserStore();

  return (
    <div className={classes.header}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={props.handleDrawer}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            <Link to="/" className="whiteLink">
              Mexle E-Learning
            </Link>
          </Typography>
          {userStore.role === "admin" ? (
            <Link to="/create" className="whiteLink">
              <Button>Neuer Kurs</Button>
            </Link>
          ) : (
            <div />
          )}

          <Switch
            label="Dark Mode"
            onChange={props.toggleDarkMode}
            checked={props.darkMode}
          />
          <Link
            to={userStore.loggedIn ? "/account" : "/login"}
            className="whiteLink"
          >
            <Button color="inherit">
              <AccountCircleIcon />
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
