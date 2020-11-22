import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Switch,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useRootStore } from "context/RootStateContext";
import CreateCourse from "components/CreateCourse";
import CreateChapter from "components/CreateChapter";
import webServiceProvider from "helpers/webServiceProvider";

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
  author?: string;
  link: string;
  kind: "Course" | "Chapter";
}

function MediaCard(props: props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { userStore } = useRootStore();

  const id =
    props.kind === "Course"
      ? props.link.split("/")[2]
      : props.kind === "Chapter"
      ? props.link.split("/")[3]
      : "";

  useEffect(() => {
    getVisibility();
  }, []);

  const handleVisibility = async (e) => {
    e.preventDefault();
    const visible = e.target.checked;
    if (props.kind === "Course") {
      await webServiceProvider.post(`courses/visible/${id}`, {
        visible: visible,
        user: userStore.username,
      });
    }
    if (props.kind === "Chapter") {
      await webServiceProvider.post(`chapters/visible/${id}`, {
        visible: visible,
        user: userStore.username,
      });
    }
    setVisible(visible);
  };

  const getVisibility = async () => {
    if (props.kind === "Course") {
      const visible = await webServiceProvider.get(`courses/visible/${id}`);
      setVisible(visible);
    }
    if (props.kind === "Chapter") {
      const visible = await webServiceProvider.get(`chapters/visible/${id}`);
      setVisible(visible);
    }
    setVisible(false);
  };

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
              _id: id,
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
              _id: id,
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
            <Typography variant="body2" color="textPrimary" component="p">
              Author: {props.author}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      {userStore.role === "admin" ? (
        <CardActions>
          <Typography>Sichtbar:</Typography>
          <Switch
            onChange={(e) => handleVisibility(e)}
            checked={visible}
            disabled={userStore.username !== props.author}
          ></Switch>
          <Button
            onClick={() => setOpen(true)}
            size="small"
            color="primary"
            disabled={userStore.username !== props.author}
          >
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
