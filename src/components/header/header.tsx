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
import { Observer } from "mobx-react";

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
  const { userStore, localStore } = useRootStore();

  return (
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
            <img className={classes.logo} src={LightLogo} />
          </Link>
        </Typography>

        <Observer>
          {() => (
            <Switch
              onChange={(e) => localStore.toggleDarkMode(e.target.checked)}
              checked={localStore.darkMode}
            />
          )}
        </Observer>

        <Observer>
          {() => (
            <Link
              className="whiteLink"
              to={userStore.loggedIn ? "/account" : "/login"}
            >
              <Button color="inherit">
                <AccountCircleIcon />
              </Button>
            </Link>
          )}
        </Observer>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
