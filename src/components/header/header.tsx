import React, { useContext, FC } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Select,
  MenuItem,
  Avatar,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import TranslateIcon from "@material-ui/icons/Translate";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { useObserver, observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import DarkLogo from "./mexle_dark.svg";
import LightLogo from "./mexle_light.svg";
import languages from "helpers/languages";
import { RootStoreContext } from "stores/RootStore";
import { isObservable } from "mobx";
import SecondHeader from "components/SecondHeader";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "sticky",
    width: "100%",
    margin: 0,
  },
  toolbar: {
    display: "flex",
    allignItems: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: "64px",
    // marginTop: "10px",
    allignSelf: "center",
  },
  select: {
    display: "flex",
    alignItems: "center",
    color: "white",
  },
}));

const Header: FC = observer((props) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { localStore, userStore } = useContext(RootStoreContext);

  return (
    <>
      <AppBar className={classes.header} elevation={0}>
        <Toolbar className={classes.toolbar}>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={props.handleDrawer}
          >
            <MenuIcon />
          </IconButton> */}

          <Link to="/" className="whiteLink">
            <img
              className={classes.logo}
              src={localStore.darkMode ? DarkLogo : LightLogo}
            />
          </Link>

          <div style={{ flexGrow: 2 }} />
          <Select
            label="language"
            renderValue={function (value) {
              return (
                <span className={classes.select}>
                  <TranslateIcon />
                  {" " + languages.find((el) => el.value === value)?.label}
                </span>
              );
            }}
            value={userStore.userData.language || i18n.language || "Deutsch"}
            onChange={(e) => i18n.changeLanguage(e.target.value as string)}
          >
            {languages.map((lng) => {
              return (
                <MenuItem value={lng.value} key={lng.value}>
                  {lng.label}
                </MenuItem>
              );
            })}
          </Select>

          <Switch
            onChange={() => localStore.toggleDarkMode()}
            checked={localStore.darkMode}
          />

          <Link
            className="whiteLink"
            to={userStore.userData.loggedIn ? "/account" : "/login"}
          >
            {userStore.userData.loggedIn ? (
              <Avatar color="inherit"></Avatar>
            ) : (
              <Typography variant="button" color="inherit">
                {t("login")}
              </Typography>
            )}
          </Link>
        </Toolbar>
      </AppBar>
      <SecondHeader />
    </>
  );
});

export default Header;
