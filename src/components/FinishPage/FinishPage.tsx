import React, { useContext } from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "./finish.png";
import { Link, useHistory } from "react-router-dom";
import { RootStoreContext } from "stores/RootStore";

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

interface IProps {
  chapterId: string;
}

function FinishPage(props: IProps) {
  const classes = useStyles();
  const { userStore, navigationStore } = useContext(RootStoreContext);
  const history = useHistory();
  console.log(history);
  const lastIndex = history.location.pathname.lastIndexOf("/");
  return (
    <Paper className={classes.root}>
      <img src={Image} className={classes.image} />
      <Typography className={classes.text} component="h5" variant="h3">
        Herzlichen Glückwunsch!
      </Typography>
      <Typography className={classes.text} component="h5" variant="h5">
        Du hast das Kapitel {props.chapterId} abgeschlossen
      </Typography>
      <Link
        to={history.location.pathname.substring(0, lastIndex) || "/courses"}
        className="whiteLink"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => userStore.addFinished("chapter", props.chapterId)}
        >
          Als Beendet markieren
        </Button>
      </Link>
    </Paper>
  );
}

export default FinishPage;
