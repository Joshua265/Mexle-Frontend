import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { Backdrop, Typography, Grid, Container } from "@material-ui/core";
import { IChapters, ICourse } from "types";
import Image from "material-ui-image";

import MediaCard from "container/MediaCard";
import AddButton from "container/AddButton";
import webServiceProvider from "helpers/webServiceProvider";
import { useTranslation } from "react-i18next";
import LoginReminder from "container/LoginReminder";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: theme.spacing(6, 0, 4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  courseInfo: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  courseImage: {
    width: theme.breakpoints.values.md / 3,
    flexGrow: 0,
    maxHeight: 400 - theme.spacing(12),
    backgroundSize: "contain",
    // borderWidth: theme.spacing(4),
    // borderColor: theme.palette.background.paper,
    // borderStyle: "solid",
    margin: theme.spacing(0, 4),
  },
}));

function ChapterPage() {
  //hooks
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();
  //state
  const [chapters, setChapters] = useState<IChapters[]>([]);
  const [courseInfo, setCourseInfo] = useState<ICourse>();
  //local vars
  const courseId = location.pathname.split("/")[2];

  //onMount
  useEffect(() => {
    getChapters();
    getCourseInfo();
  }, []);

  //fetch chapters from backend
  const getChapters = async () => {
    const chapterList = await webServiceProvider.get(
      `chapters/courseId/${courseId}`
    );
    setChapters(chapterList.chapters);
  };
  const getCourseInfo = async () => {
    const courseInfo = await webServiceProvider.get(
      `courses/courseinfo/${courseId}`
    );
    setCourseInfo(courseInfo);
  };

  //if chapters available
  if (chapters && chapters.length !== 0) {
    return (
      <React.Fragment>
        <div className={classes.header}>
          {courseInfo ? (
            <>
              <img src={courseInfo.picture} className={classes.courseImage} />
              <div className={classes.courseInfo}>
                <Typography
                  component="h1"
                  variant="h2"
                  color="textPrimary"
                  gutterBottom
                  style={{
                    margin: 0,
                    width: "100%",
                    alignSelf: "center",
                  }}
                >
                  {courseInfo.title}
                </Typography>
                <Typography
                  component="h1"
                  variant="h5"
                  color="textPrimary"
                  gutterBottom
                  style={{
                    margin: 0,
                    width: "100%",
                    alignSelf: "flex-start",
                  }}
                >
                  {courseInfo.description}
                </Typography>
              </div>
            </>
          ) : (
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {t("chapters")}
            </Typography>
          )}
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {chapters.map((chapter, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <MediaCard
                  _id={chapter._id}
                  author={chapter.author}
                  visible={chapter.visible}
                  key={chapter._id}
                  title={chapter.title}
                  description={chapter.description}
                  link={`${location.pathname}/${chapter._id}`}
                  type="Chapter"
                />
              </Grid>
            ))}
          </Grid>
        </Container>
        <AddButton add="chapter" />
        <LoginReminder />
      </React.Fragment>
    );
  }

  //if no chapters
  if (chapters.length === 0) {
    return (
      <React.Fragment>
        <p>Es sind noch keine Kaptitel für diesen Kurs verfügbar!</p>
        <AddButton add="chapter" />
      </React.Fragment>
    );
  }

  //loading animation
  return <Backdrop open={true} />;
}

export default ChapterPage;
