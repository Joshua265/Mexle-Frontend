import {
  AppBar,
  Breadcrumbs,
  Typography,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useTranslation } from "react-i18next";
import webServiceProvider from "helpers/webServiceProvider";

const useStyles = makeStyles((theme: Theme) => ({
  secondHeader: {
    marginTop: 64,
    zIndex: 1070,
    margin: 0,
    [theme.breakpoints.down("sm")]: {
      width: "0px",
      height: "0px",
    },
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
  const location = useLocation();
  const pathnames = location.pathname.split(/\/|\?/).filter((x) => x);
  const backPath = "/" + [...pathnames].slice(0, -1).join("/");
  const [formattedPathNames, setFormattedPathNames] = useState<Array<string>>(
    []
  );

  useEffect(() => {
    const getName = async (value: string, index: number): Promise<string> => {
      switch (index) {
        case 0: {
          return t(value) || value;
        }
        case 1: {
          return (
            (await webServiceProvider.get(`courses/titles/${value}`)) || value
          );
        }
        case 2: {
          return (
            (await webServiceProvider.get(`chapters/titles/${value}`)) || value
          );
        }
        case 3: {
          return (
            (await webServiceProvider.get(`steps/titles/${value}`)) || value
          );
        }
        default: {
          return value;
        }
      }
    };
    const pathnames = location.pathname.split(/\/|\?/).filter((x) => x);
    if (pathnames[0] === "courses") {
      pathnames.map(async (value, index) => {
        const title: string = await getName(value, index);
        setFormattedPathNames((formattedPathNames) => [
          ...formattedPathNames,
          title,
        ]);
      });
    } else {
      setFormattedPathNames([]);
    }
  }, [location, t]);

  return (
    <AppBar
      color="secondary"
      elevation={3}
      className={
        pathnames.length < 1 ? classes.secondHeaderClosed : classes.secondHeader
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
                {formattedPathNames.length > 0
                  ? formattedPathNames[index]
                  : value}
              </Typography>
            ) : (
              <RouterLink to={to} key={to} className="whiteLink">
                <Typography color="textSecondary">
                  {formattedPathNames.length > 0
                    ? formattedPathNames[index]
                    : value}
                </Typography>
              </RouterLink>
            );
          })}
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
}

export default SecondHeader;
