import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useLocation } from "react-router-dom";
import { Backdrop, Typography } from "@material-ui/core";

import ChapterCard from "container/ChapterCard";
import chapterList from "fakeApi/chapters.json";
import MediaCard from "container/MediaCard";
import AddButton from "container/AddButton";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minWidth: "500px",
    margin: "auto",
  },
});

interface IChapters {
  chapterId: string;
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

  function getChapters() {
    let sortedChapters: IChapters[] = [];
    chapterList.forEach((chapter) => {
      if (chapter.courseId === location.pathname.split("/")[2]) {
        sortedChapters.push(chapter);
      }
    });
    setChapters(sortedChapters);
  }

  if (chapters) {
    return (
      <React.Fragment>
        <Typography variant="h2" component="h3">
          Kapitel
        </Typography>
        {chapters.map((chapter) => (
          <MediaCard
            key={chapter.chapterId}
            title={chapter.title}
            description={chapter.description}
            link={`${location.pathname}/${chapter.chapterId}`}
          />
        ))}
        <AddButton add="chapter" />
      </React.Fragment>
    );
  }

  return <Backdrop open={true} />;
}

export default ChapterPage;
