import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import stepList from "fakeApi/steps.json";
import MediaCard from "container/MediaCard";
import FinishPage from "components/FinishPage";

import StepsProgress from "components/StepsProgress";

const useStyles = makeStyles((theme) => ({
  coursePage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
  },
  content: {
    flexGrow: 4,
    width: "300%",
    minHeight: "600px",
    margin: 20,
    padding: 20,
  },
  stepsProgress: {
    flexGrow: 0,
    width: "20%",
    minHeight: "600px",
  },
}));

function StepsPage() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const classes = useStyles();
  const location = useLocation();
  console.log(location);

  const getActiveChapter = (chapter) => {
    setCurrentChapter(chapter);
  };

  if (currentChapter === -1) {
    return <FinishPage courseName="Course Title" />;
  }
  return (
    <div className={classes.coursePage}>
      <StepsProgress
        chapters={stepList}
        className={classes.stepsProgress}
        activeChapterCallback={getActiveChapter}
      />
      <Paper className={classes.content} elevation={1}>
        <Typography variant="h6" component="h1">
          Chapter Title
        </Typography>
        <div>{ReactHtmlParser(stepList[currentChapter].html)}</div>
      </Paper>
    </div>
  );
}

export default StepsPage;
