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

function ChapterPage() {
  //equivalent to componentDidmount
  useEffect(() => {
    getChapters();
  }, []);
  const classes = useStyles();
  const location = useLocation();
  const [chapters, setChapters] = useState(undefined);

  function getChapters() {
    let sortedChapters = [];
    chapterList.forEach((chapter) => {
      if (chapter.courseId === location.pathname.replace("/course/", "")) {
        sortedChapters.push(chapters);
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

  return <Backdrop />;
}

export default ChapterPage;
