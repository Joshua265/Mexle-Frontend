import React, { useState } from "react";
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
import CreateCourse from "components/CreateCourse";
import CreateChapter from "components/CreateChapter";

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
  link: string;
  kind: "Course" | "Chapter";
}

function MediaCard(props: props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { userStore } = useRootStore();

  if (open) {
    return (
      <React.Fragment>
        {props.kind === "Course" ? (
          <CreateCourse
            edit={true}
            open={open}
            handleClose={() => setOpen(false)}
            data={{
              title: props.title,
              description: props.description,
              picture: props.imageLink,
              _id: props.link.split("/")[2],
            }}
          />
        ) : props.kind === "Chapter" ? (
          <CreateChapter
            edit={true}
            open={open}
            handleClose={() => setOpen(false)}
            data={{
              title: props.title,
              description: props.description,
              picture: props.imageLink,
              _id: props.link.split("/")[2],
            }}
          />
        ) : (
          <div />
        )}
      </React.Fragment>
    );
  }

  return (
    <Card raised variant="outlined" className={classes.root}>
      <Link to={props.link} className="whiteLink">
        <CardActionArea>
          <img className={classes.media} src={props.imageLink}></img>
          <CardContent>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
              component="h2"
            >
              {props.title}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
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
          <Button onClick={() => setOpen(true)} size="small" color="primary">
            Bearbeiten
          </Button>
        </CardActions>
      ) : (
        <React.Fragment />
      )}
    </Card>
  );
}

export default MediaCard;
