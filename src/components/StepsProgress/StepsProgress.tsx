import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  StepLabel,
  StepContent,
  StepButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Step,
  Drawer,
} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    width: drawerWidth,
    flexShrink: 0,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-between",
  },
  drawerPaper: {
    width: drawerWidth,
    paddingTop: "112px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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

interface IProps {
  steps: Array<IStep>;
  activeStepCallback: Function;
  open: boolean;
}

interface IStep {
  _id: string;
  chapterId: string;
  title: string;
  description: string;
  metadata: IMetadata;
}

interface IMetadata {
  html: String;
  multipleChoice: any;
}

//get list of titles from props
function getSteps(stepList) {
  let steps: string[] = [];
  stepList.forEach((el) => steps.push(el.title));
  return steps;
}

function StepsProgress(props: IProps) {
  const [activeChapter, setActiveChapter] = useState(0);
  const classes = useStyles();

  const steps = getSteps(props.steps);

  const getStepContent = () => {
    return props.steps[activeChapter].description;
  };

  const handleNext = () => {
    props.activeStepCallback(activeChapter + 1);
    setActiveChapter((activeChapter) => activeChapter + 1);
  };

  const handleFinish = () => {
    props.activeStepCallback(-1);
    setActiveChapter(-1);
  };

  const handleBack = () => {
    props.activeStepCallback(activeChapter - 1);
    setActiveChapter((activeChapter) => activeChapter - 1);
  };

  const handleStepClick = (index) => {
    props.activeStepCallback(index);
    setActiveChapter(index);
  };

  return (
    <Drawer
      open={props.open}
      variant="persistent"
      anchor="left"
      className={classes.root}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Stepper activeStep={activeChapter} nonLinear orientation="vertical">
        {steps.map((label, index) => (
          <Step key={index}>
            <StepButton onClick={() => handleStepClick(index)}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent}</Typography>
              </StepContent>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div className={classes.actionsContainer}>
        {/* <Button
          disabled={activeChapter === 0}
          onClick={handleBack}
          className={classes.button}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={
            activeChapter === steps.length - 1 ? handleFinish : handleNext
          }
          className={classes.button}
        >
          {activeChapter === steps.length - 1 ? "Finish" : "Next"}
        </Button> */}
        <Divider />
        <List
          component="nav"
          // className={classes.root}
          aria-label="common"
        >
          <ListItem button>
            <ListItemText primary="Lizenz" />
          </ListItem>
          <Divider />
          <ListItem button divider>
            <ListItemText primary="Verzeichnisse" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

export default StepsProgress;
