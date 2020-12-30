import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { Backdrop, Typography, Grid, Container } from "@material-ui/core";
import { IChapters } from "types";

import MediaCard from "container/MediaCard";
import AddButton from "container/AddButton";
import webServiceProvider from "helpers/webServiceProvider";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    minWidth: "500px",
    margin: "auto",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function ChapterPage() {
  useEffect(() => {
    getChapters();
  }, []);
  const classes = useStyles();
  const location = useLocation();
  const [chapters, setChapters] = useState<IChapters[]>([]);

  const getChapters = async () => {
    const chapterList = await webServiceProvider.get(
      `chapters/courseId/${location.pathname.split("/")[2]}`
    );
    setChapters(chapterList.chapters);
  };

  if (chapters && chapters.length !== 0) {
    return (
      <React.Fragment>
        <Typography variant="h2" component="h3">
          Kapitel
        </Typography>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {chapters.map((chapter, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <MediaCard
                  _id={chapter._id}
                  author={chapter.author}
                  key={chapter._id}
                  title={chapter.title}
                  description={chapter.description}
                  link={`${location.pathname}/${chapter._id}`}
                  kind="Chapter"
                />
              </Grid>
            ))}
          </Grid>
        </Container>
        <AddButton add="chapter" />
      </React.Fragment>
    );
  }

  if (chapters.length === 0) {
    return (
      <React.Fragment>
        <p>Es sind noch keine Kaptitel für diesen Kurs verfügbar!</p>
        <AddButton add="chapter" />
      </React.Fragment>
    );
  }

  return <Backdrop open={true} />;
}

export default ChapterPage;
