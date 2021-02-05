import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  makeStyles,
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Select,
  MenuItem,
  Avatar,
} from "@material-ui/core";

import TranslateIcon from "@material-ui/icons/Translate";

import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import DarkLogo from "./mexle_dark.svg";
import LightLogo from "./mexle_light.svg";
import languages from "helpers/languages";
import { RootStoreContext } from "stores/RootStore";
import SecondHeader from "components/SecondHeader";
import MexleCoin from "images/MexleCoin";

const useStyles = makeStyles((theme: Theme) => ({
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
    "&:before": {
      borderWidth: 0,
    },
    "&:after": {
      borderWidth: 0,
    },
  },
  icon: {
    fill: theme.palette.text.secondary,
  },
  mexleCoin: {
    width: 32,
    height: 32,
    margin: "0px 8px 0px 16px",
  },
  coinAmount: {
    marginRight: 16,
  },
}));

const StyledSelect = withStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
      fill: theme.palette.text.secondary,
      borderWidth: 0,

      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      "&:before": {
        borderWidth: 0,
      },
      "&:after": {
        borderWidth: 0,
      },
    },
  })
)(Select);

const Header = observer((props) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { localStore, userStore } = useContext(RootStoreContext);
  const location = useLocation();

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
              alt="logo"
            />
          </Link>

          <div style={{ flexGrow: 2 }} />
          <StyledSelect
            label="language"
            className={classes.select}
            inputProps={{
              classes: {
                icon: classes.icon,
              },
            }}
            renderValue={function (value) {
              return (
                <span className={classes.select}>
                  <TranslateIcon />
                  {" " + languages[String(value)]}
                </span>
              );
            }}
            value={userStore.userData.language || i18n.language || "Deutsch"}
            onChange={(e) => i18n.changeLanguage(e.target.value as string)}
          >
            {Object.keys(languages).map((value) => {
              return (
                <MenuItem value={value} key={value}>
                  {languages[value]}
                </MenuItem>
              );
            })}
          </StyledSelect>

          <Switch
            onChange={() => localStore.toggleDarkMode()}
            checked={localStore.darkMode}
          />

          {userStore.userData.loggedIn ? (
            <>
              <MexleCoin className={classes.mexleCoin} />
              <Typography
                variant="body1"
                component="h5"
                className={classes.coinAmount}
              >
                {userStore.userData.coins || 0}
              </Typography>
            </>
          ) : (
            <React.Fragment />
          )}

          <Link
            className="whiteLink"
            to={
              userStore.userData.loggedIn
                ? "/account"
                : `/login?path=${location.pathname}`
            }
          >
            {userStore.userData.loggedIn ? (
              <Avatar color="inherit" src={userStore.avatarUrl}></Avatar>
            ) : (
              <Typography variant="button" color="textSecondary">
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
