import React, { useState, FC, useContext } from "react";

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
import { useTranslation } from "react-i18next";
import { IStep, IContent, IFinishedObject } from "types";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "stores/RootStore";

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
  drawerOpen: {
    paddingTop: "112px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    paddingTop: "112px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
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
  open: boolean;
}

// //get list of titles from props
// const getSteps: I = observer((stepList) {
//   let steps: string[] = [];
//   stepList.forEach((el) => steps.push(el.title));
//   return steps;
// }

const StepsProgress = observer((props: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { stepStore, userStore } = useContext(RootStoreContext);
  const { steps, activeStep, numberSteps } = stepStore.steps;

  const handleStepClick = (index) => {
    stepStore.setActiveStep(index);
  };

  const checkFinished = (_id: string) => {
    if (
      userStore.userData.finishedSteps.some(
        (element: IFinishedObject) => element.id === _id
      )
    ) {
      return true;
    }
    return false;
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
      <Stepper activeStep={activeStep} nonLinear orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index} completed={checkFinished(step._id)}>
            <StepButton onClick={() => handleStepClick(index)}>
              {step.title}
            </StepButton>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <div className={classes.actionsContainer}>
        <Divider />
        <List
          component="nav"
          // className={classes.root}
          aria-label="common"
        >
          <ListItem button>
            <ListItemText primary={t("license")} />
          </ListItem>
          <Divider />
          <ListItem button divider>
            <ListItemText primary={t("directories")} />
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary={`${t("author")}: ${steps[activeStep].author}`}
            />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
});

export default StepsProgress;
