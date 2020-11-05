import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useLocation } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";

import ChapterCard from "container/ChapterCard";
import chapterList from "fakeApi/chapters.json";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minWidth: "500px",
    margin: "auto",
  },
});

interface IChapters {
  chapterId: number,
  courseId: string,
  title: string,
  description: string
}

function ChapterPage() {
  //equivalent to componentDidmount
  useEffect(() => {
    getChapters();
  }, []);
  const classes = useStyles();
  const location = useLocation();
  const [chapters, setChapters] = useState<IChapters[]>([]);

  function getChapters() {
    let sortedChapters: IChapters[] = [];
    chapterList.forEach((chapter) => {
      if (chapter.courseId === location.pathname.replace("/course/", "")) {
        sortedChapters.push(chapter);
      }
    });
    setChapters(sortedChapters);
  }

  if (chapters) {
    return (
      <div className={classes.root}>
        <h1>Kapitel</h1>
        {chapters.map((chapter) => (
          <ChapterCard key={chapter.chapterId} />
        ))}
      </div>
    );
  }

  return <Backdrop open={true}/>;
}

export default ChapterPage;
