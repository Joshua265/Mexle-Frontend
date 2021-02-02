import React, { useState, useContext, useEffect, Suspense } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
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
import { IFinishedStep } from "types";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "stores/RootStore";
import webServiceProvider from "helpers/webServiceProvider";
import checkForEditShow from "helpers/checkForEditShow";

const CreateStep = React.lazy(() => import("components/CreateStep"));

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-between",
  },
  drawerPaper: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
    paddingTop: "160px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  drawerOpen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    display: "none",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  stepperWindow: {
    overflowY: "auto",
    minHeight: "100px",
    flexGrow: 2,
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

interface IProps {
  open: boolean;
  chapterId: string;
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
  const [chapterTitle, setChapterTitle] = useState();
  const [open, setOpen] = useState(false);

  const handleStepClick = (index) => {
    stepStore.setActiveStep(index);
  };

  useEffect(() => {
    getChapterTitle();
  }, []);

  const getChapterTitle = async () => {
    const title = await webServiceProvider.get(
      `chapters/titles/${props.chapterId}`
    );
    setChapterTitle(title);
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
      <>
        <Typography variant="h6" component="h1" style={{ textAlign: "center" }}>
          {chapterTitle || ""}
        </Typography>
        {
          //only show editButton and edit to certain users
          checkForEditShow(userStore.userData, steps[activeStep].author) ? (
            <React.Fragment>
              <Button onClick={() => setOpen(true)} color="secondary">
                {t("edit")}
              </Button>
              <Suspense fallback={<p>Error loading CreateStep</p>}>
                <CreateStep
                  edit
                  open={open}
                  handleClose={() => setOpen(false)}
                  id={steps[activeStep]._id}
                />
              </Suspense>
            </React.Fragment>
          ) : (
            <React.Fragment />
          )
        }
        <div className={classes.stepperWindow}>
          <Stepper activeStep={activeStep} nonLinear orientation="vertical">
            {steps.map((step, index) => (
              <Step
                key={index}
                completed={userStore.userData.finishedSteps.some(
                  (element: IFinishedStep) => element.stepId === step._id
                )}
              >
                <StepButton onClick={() => handleStepClick(index)}>
                  {step.title}
                </StepButton>
                <StepContent>
                  <Typography>{step.description}</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
      </>
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
