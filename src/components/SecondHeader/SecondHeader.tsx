import {
  AppBar,
  Breadcrumbs,
  Paper,
  Typography,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink } from "react-router-dom";
import { Route, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
    overflow: "hidden",
  },
}));

function SecondHeader() {
  const classes = useStyles();

  return (
    <Route>
      {({ location }) => {
        const pathnames = location.pathname.split("/").filter((x) => x);
        const backPath = "/" + [...pathnames].slice(0, -1).join("/");
        console.log(pathnames);
        console.log(backPath);
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
                  <ArrowBackIosIcon />
                </IconButton>
              </RouterLink>
              <Breadcrumbs aria-label="Breadcrumb">
                <RouterLink color="textSecondary" to="/" className="whiteLink">
                  Home
                </RouterLink>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                  return last ? (
                    <Typography key={to} className="whiteLink">
                      {value}
                    </Typography>
                  ) : (
                    <RouterLink
                      color="#fffff"
                      to={to}
                      key={to}
                      className="whiteLink"
                    >
                      {value}
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
