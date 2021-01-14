import {
  AppBar,
  Breadcrumbs,
  Paper,
  Typography,
  Toolbar,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink } from "react-router-dom";
import { Route, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  secondHeader: {
    marginTop: 64,
    zIndex: 1070,
    margin: 0,
  },
  secondHeaderClosed: {
    margin: 0,
    width: "0px",
    height: "0px",
  },
}));

function SecondHeader() {
  const classes = useStyles();

  return (
    <Route>
      {({ location }) => {
        const pathnames = location.pathname.split("/").filter((x) => x);
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
              <Breadcrumbs aria-label="Breadcrumb">
                <RouterLink color="textSecondary" to="/" className="whiteLink">
                  Home
                </RouterLink>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                  return last ? (
                    <Typography
                      color="textPrimary"
                      key={to}
                      className="whiteLink"
                    >
                      {value}
                    </Typography>
                  ) : (
                    <RouterLink
                      color="textSecondary"
                      to={to}
                      key={to}
                      className="whiteLink"
                    >
                      {value}
                    </RouterLink>
                  );
                })}
              </Breadcrumbs>{" "}
            </Toolbar>
          </AppBar>
        );
      }}
    </Route>
  );
}

export default SecondHeader;
