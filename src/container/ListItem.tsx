import React, { useState, useEffect, useContext } from "react";
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
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import CreateCourse from "components/CreateCourse";
import CreateChapter from "components/CreateChapter";
import webServiceProvider from "helpers/webServiceProvider";
import checkForEditShow from "helpers/checkForEditShow";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { RootStoreContext } from "stores/RootStore";

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
  language?: string;
  license?: string;
  directories?: Array<any>;
  link: string;
  kind: "Course" | "Chapter";
}

function MediaCard(props: props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { userStore } = useContext(RootStoreContext);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

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
    try {
      if (props.kind === "Course") {
        await webServiceProvider.post(`courses/visible/${id}`, {
          visible: visible,
          user: userStore.userData.username,
        });
      }
      if (props.kind === "Chapter") {
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
              visible: visible,
              picture: props.imageLink,
              license: props.license,
              directories: props.directories,
              language: props.language || "",
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
    <Link to={props.link} className="whiteLink">
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="describing picture" src={props.imageLink} />
        </ListItemAvatar>
        <ListItemText primary={props.title} secondary={props.description} />
        <Typography variant="body2" color="textPrimary" component="p">
          {t("author")}: {props.author}
        </Typography>
        {props.license ? (
          <Typography variant="body2" color="textPrimary" component="p">
            {t("license")}: {props.license}
          </Typography>
        ) : (
          <React.Fragment />
        )}
      </ListItem>
    </Link>

    // <Card raised variant="outlined" className={classes.root}>
    //
    //     <CardActionArea>
    //       <img className={classes.media} src={props.imageLink}></img>
    //       <CardContent>
    //         <Typography
    //           color="textSecondary"
    //           gutterBottom
    //           variant="h5"
    //           component="h2"
    //         >
    //           {props.title}
    //         </Typography>
    //         <Typography variant="body2" color="textPrimary" component="p">
    //           {props.description}
    //         </Typography>
    //         <Typography variant="body2" color="textPrimary" component="p">
    //           {t("author")}: {props.author}
    //         </Typography>
    //         {props.license ? (
    //           <Typography variant="body2" color="textPrimary" component="p">
    //             {t("license")}: {props.license}
    //           </Typography>
    //         ) : (
    //           <React.Fragment />
    //         )}
    //       </CardContent>
    //     </CardActionArea>
    //   </Link>
    //   {checkForEditShow(userStore.userData) ? (
    //     <CardActions>
    //       <Typography>{t("visible")}:</Typography>
    //       <Switch
    //         onChange={(e) => handleVisibility(e)}
    //         checked={visible}
    //         disabled={!checkForEditShow(userStore.userData, props.author)}
    //       ></Switch>
    //       <Button
    //         onClick={() => setOpen(true)}
    //         size="small"
    //         color="primary"
    //         disabled={!checkForEditShow(userStore.userData, props.author)}
    //       >
    //         {t("edit")}
    //       </Button>
    //     </CardActions>
    //   ) : (
    //     <React.Fragment />
    //   )}
    // </Card>
  );
}

export default MediaCard;
