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
import { Route } from "react-router-dom";
import React from "react";

function SimpleBreadcrumbs() {
  return (
    <Route>
      {({ location }) => {
        const pathnames = location.pathname.split("/").filter((x) => x);
        return (
          <Breadcrumbs aria-label="Breadcrumb">
            <RouterLink color="textSecondary" to="/" className="whiteLink">
              Home
            </RouterLink>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;

              return last ? (
                <Typography color="textPrimary" key={to} className="whiteLink">
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
          </Breadcrumbs>
        );
      }}
    </Route>
  );
}

const useStyles = makeStyles((theme) => ({
  secondHeader: {
    position: "sticky",
    width: "100%",
    top: 64,
    zIndex: 1400,
  },
}));

function SecondHeader() {
  const classes = useStyles();
  return (
    <AppBar color="secondary" className={classes.secondHeader}>
      <Toolbar variant="dense">
        <SimpleBreadcrumbs />
      </Toolbar>
    </AppBar>
  );
}

export default SecondHeader;
