import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useLocation } from "react-router-dom";
import { Backdrop, Typography } from "@material-ui/core";

import MediaCard from "container/MediaCard";
import AddButton from "container/AddButton";
import webServiceProvider from "helpers/webServiceProvider";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minWidth: "500px",
    margin: "auto",
  },
});

interface IChapters {
  _id: string;
  courseId: string;
  title: string;
  description: string;
}

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
        {chapters.map((chapter) => (
          <MediaCard
            key={chapter._id}
            title={chapter.title}
            description={chapter.description}
            link={`${location.pathname}/${chapter._id}`}
            kind="Chapter"
          />
        ))}
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
