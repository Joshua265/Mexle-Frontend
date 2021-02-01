import React, { useState, useEffect, useContext } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Switch,
  Chip,
  Avatar,
  Icon,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import { Link } from "react-router-dom";
import CreateCourse from "components/CreateCourse";
import CreateChapter from "components/CreateChapter";
import webServiceProvider from "helpers/webServiceProvider";
import checkForEditShow from "helpers/checkForEditShow";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import LibraSvg from "images/libra";
import LanguageIcon from "@material-ui/icons/Language";
import { RootStoreContext } from "stores/RootStore";
import languages from "helpers/languages";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  rootDone: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderColor: "#35D435",
    borderWidth: "2px",
    position: "relative",
  },
  media: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 2,
  },
  chip: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
  libra: {
    fill: theme.palette.text.primary,
  },
  doneIcon: {
    position: "absolute",
    right: -8,
    top: -8,
    zIndex: 10,
    color: theme.palette.getContrastText("#35D435"),
    backgroundColor: "#35D435",
  },
}));

interface props {
  _id: string;
  title: string;
  visible: boolean;
  description?: string;
  imageLink?: string;
  author: string;
  language?: string;
  license?: string;
  directorys?: Array<any>;
  link: string;
  type: "Course" | "Chapter";
}

function MediaCard(props: props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(props.visible);
  const [done, setDone] = useState(false);
  const { userStore } = useContext(RootStoreContext);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const id =
    props.type === "Course"
      ? props.link.split("/")[2]
      : props.type === "Chapter"
      ? props.link.split("/")[3]
      : "";

  useEffect(() => {
    checkDone();
  });

  const checkDone = (): void => {
    if (props.type === "Course" && userStore.userData.loggedIn) {
      if (
        userStore.userData.finishedCourses.some(
          (element) => element._id === props._id
        )
      ) {
        setDone(true);
      }
    }
    if (props.type === "Chapter") {
      if (
        userStore.userData.finishedChapters.some(
          (element) => element._id === props._id
        )
      ) {
        setDone(true);
      }
    }
  };

  const handleVisibility = async (e) => {
    e.preventDefault();
    const visible = e.target.checked;
    try {
      if (props.type === "Course") {
        await webServiceProvider.post(`courses/visible/${id}`, {
          visible: visible,
          user: userStore.userData.username,
        });
      }
      if (props.type === "Chapter") {
        await webServiceProvider.post(`chapters/visible/${id}`, {
          visible: visible,
          user: userStore.userData.username,
        });
      }
    } catch (e) {
      enqueueSnackbar(t("novisibilitychange"), { variant: "error" });
    }
    setVisible(visible);
  };

  const getVisibility = async () => {
    if (props.type === "Course") {
      const visible = await webServiceProvider.get(`courses/visible/${id}`);
      setVisible(visible);
    }
    if (props.type === "Chapter") {
      const visible = await webServiceProvider.get(`chapters/visible/${id}`);
      setVisible(visible);
    }
    setVisible(false);
  };

  if (open) {
    return (
      <React.Fragment>
        {props.type === "Course" ? (
          <CreateCourse
            edit={true}
            open={open}
            handleClose={() => setOpen(false)}
            data={{
              title: props.title,
              description: props.description,
              visible: visible,
              picture: props.imageLink,
              license: props.license,
              directory: props.directorys,
              language: props.language || "",
              _id: id,
            }}
          />
        ) : props.type === "Chapter" ? (
          <CreateChapter
            edit={true}
            open={open}
            handleClose={() => setOpen(false)}
            data={{
              title: props.title,
              description: props.description,
              visible: visible,
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
    <Card
      raised
      variant="outlined"
      className={done ? classes.rootDone : classes.root}
    >
      {done ? (
        <Avatar color="action" className={classes.doneIcon}>
          <DoneIcon />
        </Avatar>
      ) : (
        <React.Fragment />
      )}
      <Link to={props.link} className="whiteLink">
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.imageLink}
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
              component="h2"
            >
              {props.title}
            </Typography>
            <Typography
              variant="body2"
              color="textPrimary"
              component="p"
              noWrap
            >
              {props.description}
            </Typography>
            {props.type === "Course" ? (
              <>
                <Chip
                  className={classes.chip}
                  avatar={<Avatar>{props.author[0]}</Avatar>}
                  label={`${t("author")}: ${props.author}`}
                />
                <Chip
                  className={classes.chip}
                  avatar={<LibraSvg className={classes.libra} />}
                  label={`${t("license")}: ${props.license || t("none")}`}
                />
                <Chip
                  className={classes.chip}
                  avatar={<LanguageIcon className={classes.libra} />}
                  label={`${t("language")}: ${
                    languages[props.language || "en-EN"]
                  }`}
                />
              </>
            ) : (
              <></>
            )}
          </CardContent>
        </CardActionArea>
      </Link>
      {checkForEditShow(userStore.userData) ? (
        <CardActions>
          <Typography>{t("visible")}:</Typography>
          <Switch
            color="primary"
            onChange={(e) => handleVisibility(e)}
            checked={visible}
            disabled={!checkForEditShow(userStore.userData, props.author)}
          ></Switch>
          <Button
            onClick={() => setOpen(true)}
            size="small"
            color="secondary"
            disabled={!checkForEditShow(userStore.userData, props.author)}
          >
            {t("edit")}
          </Button>
        </CardActions>
      ) : (
        <React.Fragment />
      )}
    </Card>
  );
}

export default MediaCard;
