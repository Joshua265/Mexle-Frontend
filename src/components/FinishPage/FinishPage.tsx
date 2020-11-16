import React from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "./finish.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    margin: "auto",
    marginTop: "20px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    // maxWidth: '420px'
  },
  image: {
    maxHeight: "360px",
    maxwidth: "360px",
  },
  text: {
    margin: "20px",
  },
});

function FinishPage(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <img src={Image} className={classes.image} />
      <Typography className={classes.text} component="h5" variant="h3">
        Herzlichen Glückwunsch!
      </Typography>
      <Typography className={classes.text} component="h5" variant="h5">
        Du hast das Kapitel {props.courseName} abgeschlossen
      </Typography>
      <Link to={props.redirect || "/"} className="whiteLink">
        <Button variant="contained" color="primary">
          Als Beendet markieren
        </Button>
      </Link>
    </Paper>
  );
}

export default FinishPage;
