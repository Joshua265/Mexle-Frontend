import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, Paper, Typography, Button } from "@material-ui/core";
import FinishPage from "components/FinishPage";

import StepsProgress from "components/StepsProgress";
import AddButton from "container/AddButton";
import webServiceProvider from "helpers/webServiceProvider";
import transform from "helpers/transform";
import { useRootStore } from "context/RootStateContext";
import CreateStep from "components/CreateStep";
import MultipleChoice from "components/MultipleChoice";

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

interface IMetadata {
  html: String;
  multipleChoice: any;
}

interface IChapters {
  _id: string;
  courseId: string;
  title: string;
  description: string;
}

interface IStep {
  _id: string;
  chapterId: string;
  title: string;
  description: string;
  metadata: IMetadata;
}

function StepsPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<IStep[]>([]);
  const [error, setError] = useState(false);
  const [chapter, setChapter] = useState<IChapters>();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const location = useLocation();
  const { userStore } = useRootStore();
  const chapterId = location.pathname.split("/")[3];

  useEffect(() => {
    fetchSteps();
    fetchChapter();
  }, []);

  const getActiveStep = (step) => {
    setCurrentStep(step);
  };

  //replace with fetch steps by chapterId function
  const fetchSteps = async () => {
    try {
      const stepList = await webServiceProvider.get(
        `steps/chapterId/${chapterId}`
      );
      setSteps(stepList.steps);
    } catch {
      setError(true);
    }
  };

  const fetchChapter = async () => {
    const chapter = await webServiceProvider.get(`chapters/${chapterId}`);
    setChapter(chapter.chapter);
  };

  //when pressed finish
  if (currentStep === -1) {
    return (
      <FinishPage
        courseName={chapter ? chapter.title : ""}
        redirect={location.pathname.replace(
          chapter ? `/${chapter._id}` : "",
          ""
        )}
      />
    );
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
            {chapter ? chapter.title : ""} | {steps[currentStep].title}
          </Typography>
          {userStore.role === "admin" ? (
            <React.Fragment>
              <Button onClick={() => setOpen(true)}>Bearbeiten</Button>
              <CreateStep
                edit={true}
                open={open}
                handleClose={() => setOpen(false)}
                id={steps[currentStep]._id}
              />
            </React.Fragment>
          ) : (
            <React.Fragment />
          )}
          <React.Fragment>
            {steps[currentStep].metadata ? (
              ReactHtmlParser(steps[currentStep].metadata.html, {
                transform: transform,
              })
            ) : (
              <React.Fragment />
            )}
            {steps[currentStep].metadata.multipleChoice ? (
              steps[currentStep].metadata.multipleChoice.map((data, index) => {
                return <MultipleChoice key={index} data={data} />;
              })
            ) : (
              <React.Fragment />
            )}
          </React.Fragment>
        </Paper>
        <AddButton add="step" />
      </div>
    );
  }

  if (steps && steps.length === 0) {
    return (
      <React.Fragment>
        <p>No steps yet</p>
        <AddButton add="step" />
      </React.Fragment>
    );
  }

  if (error) {
    return <p>API Server Error</p>;
  }

  //return on loading
  return <Backdrop open={true} />;
}

export default StepsPage;
