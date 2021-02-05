/*
Entire Page needs rework for mobx chapter storage


*/
import React, { useState, useEffect, FC, useContext, Suspense } from "react";
import { useLocation, useHistory } from "react-router-dom";
// import HtmlToReactParser from "html-to-react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Backdrop,
  Paper,
  Button,
  IconButton,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import FinishPage from "components/FinishPage";

import StepsProgress from "components/StepsProgress";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import {
  htmlToReactParser,
  isValidNode,
  processingInstructions,
} from "helpers/transform";
import { RootStoreContext } from "stores/RootStore";
import LoginReminder from "container/LoginReminder";

const AddButton = React.lazy(() => import("container/AddButton"));

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  coursePage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    maxWidth: theme.breakpoints.values.lg,
  },
  paper: {
    margin: "auto",
    padding: 20,
    overflowX: "hidden",
    width: `calc(100% - 40)`,
    maxWidth: theme.breakpoints.values.lg,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  paperShift: {
    margin: "auto",
    padding: 20,
    overflowX: "hidden",
    width: `calc(100% - ${drawerWidth}px - 40)`,
    maxWidth: theme.breakpoints.values.lg,
    marginLeft: `max(${drawerWidth + 20}px, auto)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    position: "fixed",
    [theme.breakpoints.up("sm")]: {
      top: theme.mixins.toolbar.height,
    },
    [theme.breakpoints.down("sm")]: {
      top: 56,
    },
    zIndex: 1299,
  },
  titlePaper: {
    position: "sticky",
    top: -20,
    paddingTop: 20,
    margin: -20,
    marginBottom: 0,
  },
}));

const StepsPage: FC = observer(() => {
  const [openStepProgress, setOpenStepProgress] = useState(true);
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();
  const { userStore, stepStore } = useContext(RootStoreContext);
  const chapterId = location.pathname.split("/")[3];
  const { activeStep, numberSteps, steps, error, loaded } = stepStore.steps;

  useEffect(() => {
    stepStore.fetchSteps(chapterId);
    return () => {
      stepStore.clearSteps();
    };
  }, [stepStore, chapterId]);

  useEffect(() => {
    if (numberSteps > 0 && activeStep !== -1) {
      history.push(`?stepId=${steps[activeStep]._id}`);
    }
  }, [activeStep, numberSteps, steps, history]);

  const handleMarkFinished = () => {
    if (activeStep === numberSteps - 1) {
      stepStore.setActiveStep(-1);
    } else {
      stepStore.setActiveStep(activeStep + 1);
    }
    userStore.addFinished("step", steps[activeStep]._id);
  };

  //when pressed finish
  if (activeStep === -1) {
    return <FinishPage chapterId={chapterId} />;
  }

  //return when steps are loaded
  if (steps && numberSteps > 0) {
    return (
      <React.Fragment>
        <IconButton
          className={classes.menuButton}
          onClick={() => setOpenStepProgress(!openStepProgress)}
        >
          <MenuIcon />
        </IconButton>
        <StepsProgress open={openStepProgress} chapterId={chapterId} />
        <Paper
          className={openStepProgress ? classes.paperShift : classes.paper}
          elevation={1}
        >
          <div className={classes.content}>
            {/* {steps[currentStep].content.html} */}
            {steps[activeStep].content.html ? (
              htmlToReactParser.parseWithInstructions(
                steps[activeStep].content.html,
                isValidNode,
                processingInstructions
              )
            ) : (
              <React.Fragment />
            )}
          </div>
          <Divider style={{ margin: 12 }} />
          <Button
            disabled={activeStep === 0}
            onClick={() => stepStore.setActiveStep(activeStep - 1)}
          >
            {t("back")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleMarkFinished}
          >
            {activeStep === steps.length - 1
              ? t("finish")
              : t("markfinishedstep")}
          </Button>
        </Paper>
        <Suspense fallback={<></>}>
          <AddButton add="step" />
        </Suspense>
        <LoginReminder />
      </React.Fragment>
    );
  }

  if (loaded && steps.length === 0) {
    return (
      <React.Fragment>
        <p>No steps yet</p>
        <Suspense fallback={<></>}>
          <AddButton add="step" />
        </Suspense>
      </React.Fragment>
    );
  }

  if (error) {
    return <p>API Server Error</p>;
  }

  //return on loading
  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
});

export default StepsPage;
