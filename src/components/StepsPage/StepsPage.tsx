import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, Paper, Typography } from "@material-ui/core";
import stepList from "fakeApi/steps.json";
import MediaCard from "container/MediaCard";
import FinishPage from "components/FinishPage";

import StepsProgress from "components/StepsProgress";
import AddButton from "container/AddButton";

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

interface IStep {
  StepId: string;
  chapterId: string;
  title: string;
  description: string;
  html: string;
  exercise: string;
}

function StepsPage() {
  useEffect(() => {
    fetchSteps(stepList);
  }, []);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<IStep[]>([]);
  const classes = useStyles();
  const location = useLocation();

  const getActiveStep = (step) => {
    setCurrentStep(step);
  };

  //replace with fetch steps by chapterId function
  const fetchSteps = (stepList) => {
    let sortedSteps: IStep[] = [];
    stepList.forEach((step) => {
      if (step.chapterId === location.pathname.split("/")[3]) {
        sortedSteps.push(step);
      }
      setSteps(sortedSteps);
    });
  };

  //when pressed finish
  if (currentStep === -1) {
    return <FinishPage courseName="Course Title" />;
  }

  //return when steps are loaded
  if (steps && steps.length > 0) {
    return (
      <div className={classes.coursePage}>
        <StepsProgress
          steps={steps}
          className={classes.stepsProgress}
          activeStepCallback={getActiveStep}
        />
        <Paper className={classes.content} elevation={1}>
          <Typography variant="h6" component="h1">
            Chapter Title | {steps[currentStep].title}
          </Typography>
          <div>{ReactHtmlParser(steps[currentStep].html)}</div>
        </Paper>
        <AddButton add="step" />
      </div>
    );
  }

  if (steps && steps.length === 0) {
    return <p>No steps yet</p>;
  }

  //return on loading
  return <Backdrop open={true} />;
}

export default StepsPage;
