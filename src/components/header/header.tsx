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

import { useRootStore } from "context/RootStateContext";
import { useObserver, observer } from "mobx-react";

import DarkLogo from "./mexle_dark.svg";
import LightLogo from "./mexle_light.svg";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "sticky",
    width: "100%",
    margin: 0,
    flexGrow: 1,
    zIndex: 1400,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    height: "38px",
    marginTop: "10px",
  },
}));

function Header(props) {
  const classes = useStyles();
  const { userStore } = useRootStore();

  return useObserver(() => (
    <AppBar className={classes.header}>
      <Toolbar>
        {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={props.handleDrawer}
          >
            <MenuIcon />
          </IconButton> */}

        <Typography variant="h6" className={classes.title}>
          <Link to="/" className="whiteLink">
            <img
              className={classes.logo}
              src={props.darkMode ? LightLogo : DarkLogo}
            />
          </Link>
        </Typography>
        {userStore.role === "admin" ? (
          <Link to="/create" className="whiteLink">
            <Button>Neuer Kurs</Button>
          </Link>
        ) : (
          <div />
        )}

        <Switch onChange={props.toggleDarkMode} checked={props.darkMode} />
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
  ));
}

export default observer(Header);
