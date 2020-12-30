import {
  Button,
  Paper,
  Typography,
  Select,
  MenuItem,
  Box,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100vw",
    overflowX: "hidden",
  },
  firstView: {
    display: "flex",
    flexDirection: "row",
  },
  title: {},
}));

function HomePage() {
  const history = useHistory();
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState("");
  return (
    <div className={classes.root}>
      <div className={classes.firstView}>
        <img
          src="/images/platinen.png"
          style={{ float: "right", width: "50%", marginTop: "80px" }}
        ></img>
      </div>

      <Button
        variant="outlined"
        color="secondary"
        onClick={() => history.push("/courses")}
      >
        Zu den Kursen
      </Button>
    </div>
  );
}

export default HomePage;
