import {
  AppBar,
  Breadcrumbs,
  Paper,
  Typography,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { Route, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) => ({
  secondHeader: {
    marginTop: 64,
    zIndex: 1070,
    margin: 0,
  },
  secondHeaderClosed: {
    margin: 0,
    width: "0px",
    height: "0px",
    overflow: "hidden",
  },
  backIcon: {
    fill: theme.palette.text.secondary,
  },
}));

function SecondHeader() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Route>
      {({ location }) => {
        const pathnames = location.pathname.split("/").filter((x) => x);
        const backPath = "/" + [...pathnames].slice(0, -1).join("/");
        return (
          <AppBar
            color="secondary"
            elevation={3}
            className={
              pathnames.length < 1
                ? classes.secondHeaderClosed
                : classes.secondHeader
            }
          >
            <Toolbar variant="dense">
              <RouterLink to={backPath} className="whiteLink">
                <IconButton style={{ width: 64, marginRight: 24 }}>
                  <ArrowBackIosIcon className={classes.backIcon} />
                </IconButton>
              </RouterLink>
              <Breadcrumbs aria-label="Breadcrumb">
                <RouterLink to="/" className="whiteLink">
                  <Typography color="textSecondary">{t("home")}</Typography>
                </RouterLink>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                  return last ? (
                    <Typography color="textSecondary" key={to}>
                      {value}
                    </Typography>
                  ) : (
                    <RouterLink to={to} key={to} className="whiteLink">
                      <Typography color="textSecondary">{value}</Typography>
                    </RouterLink>
                  );
                })}
              </Breadcrumbs>
            </Toolbar>
          </AppBar>
        );
      }}
    </Route>
  );
}

export default SecondHeader;
