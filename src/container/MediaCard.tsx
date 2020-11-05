import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useRootStore } from "context/RootStateContext";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 20,
  },
  media: {
    height: 140,
    margin: 20,
  },
});

interface props {
  title: string;
  description?: string;
  imageLink?: string;
  link?: string;
}

function MediaCard(props: props) {
  const classes = useStyles();
  const { userStore } = useRootStore();

  return (
    <Card raised variant="outlined" className={classes.root}>
      <Link to={props.link} className="whiteLink">
        <CardActionArea>
          <img className={classes.media} src={props.imageLink}></img>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      {userStore.role === "admin" ? (
        <CardActions>
          <Button size="small" color="primary">
            Löschen
          </Button>
          <Button size="small" color="primary">
            KursDetails ändern
          </Button>
        </CardActions>
      ) : (
        <React.Fragment />
      )}
    </Card>
  );
}

export default MediaCard;
