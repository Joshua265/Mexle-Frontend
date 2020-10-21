import React, {useState} from 'react';
import Drawer from '@material-ui/core/Drawer';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {Stepper, StepLabel, StepContent, Paper, Typography, Button, Step} from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
    // maxWidth: '420px'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps(chapters) {
  let steps = [];
  chapters.forEach((el) => steps.push(el.title));
  return steps;
}



function ChapterProgress(props) {
  const [activeChapter, setActiveChapter] = useState(0);
  const classes = useStyles();

  const steps = getSteps(props.chapters);

  const getStepContent = () => {
    return props.chapters[activeChapter].description;
  }

  const handleNext = () => {
    props.activeChapterCallback(activeChapter + 1);
    setActiveChapter((activeChapter) => activeChapter + 1);
  };

  const handleFinish = () => {
    props.activeChapterCallback(-1);
    setActiveChapter(-1);
  };

  const handleBack = () => {
    props.activeChapterCallback(activeChapter - 1);
    setActiveChapter((activeChapter) => activeChapter - 1);
  };

  return (
    <Paper className={classes.root}>
      <Stepper activeStep={activeChapter} orientation="vertical" >
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel>{label}</StepLabel>
          <StepContent>
            <Typography>{getStepContent(index)}</Typography>
            <div className={classes.actionsContainer}>
              <div>
                <Button
                  disabled={activeChapter === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={activeChapter === steps.length - 1 ? handleFinish : handleNext}
                  className={classes.button}
                >
                  {activeChapter === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  </Paper>
  )
}

export default ChapterProgress;
