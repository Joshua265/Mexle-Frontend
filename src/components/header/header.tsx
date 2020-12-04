import React, { FC } from "react";
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
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import TranslateIcon from "@material-ui/icons/Translate";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { useRootStore } from "context/RootStateContext";
import { useObserver, observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import DarkLogo from "./mexle_dark.svg";
import LightLogo from "./mexle_light.svg";
import languages from "helpers/languages";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "sticky",
    width: "100%",
    margin: 0,
    flexGrow: 1,
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
  select: {
    display: "flex",
    alignItems: "center",
    color: "white",
  },
}));

const Header: FC = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { userStore, localStore } = useRootStore();

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
            <img className={classes.logo} src={LightLogo} />
          </Link>
        </Typography>

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
          to={userStore.loggedIn ? "/account" : "/login"}
        >
          <Button color="inherit">
            {userStore.loggedIn ? <AccountCircleIcon /> : <p>{t("login")}</p>}
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  ));
};

export default Header;
