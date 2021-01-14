/*
Entire Page needs rework for mobx chapter storage


*/
import React, { useState, useEffect, FC, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
// import HtmlToReactParser from "html-to-react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Backdrop,
  Paper,
  Typography,
  Button,
  IconButton,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import FinishPage from "components/FinishPage";

import StepsProgress from "components/StepsProgress";
import AddButton from "container/AddButton";
import MultipleChoice from "components/MultipleChoice";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import {
  htmlToReactParser,
  isValidNode,
  processingInstructions,
} from "helpers/transform";
import { RootStoreContext } from "stores/RootStore";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  coursePage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
  },
  content: {
    margin: "0px 0px 0px 20px",
    padding: 20,
    overflowX: "hidden",
    width: `calc(100% - 40)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // height: "calc(100vh - 112px)",
  },
  contentShift: {
    marginTop: 0,
    marginRight: 0,
    padding: 20,
    overflowX: "hidden",
    width: `calc(100% - ${drawerWidth}px - 40)`, //${theme.spacing(7) + 1})`,
    marginLeft: drawerWidth + 20,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // height: "calc(100vh - 112px)",
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
  const [open, setOpen] = useState(false);
  const [openStepProgress, setOpenStepProgress] = useState(true);
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();
  const { userStore, stepStore } = useContext(RootStoreContext);
  const chapterId = location.pathname.split("/")[3];
  const { activeStep, numberSteps, steps, error } = stepStore.steps;

  useEffect(() => {
    stepStore.fetchSteps(chapterId);
    return () => {
      stepStore.clearSteps();
    };
  }, []);

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
        <StepsProgress open={openStepProgress} />
        <Paper
          className={openStepProgress ? classes.contentShift : classes.content}
          elevation={1}
        >
          <React.Fragment>
            {/* {steps[currentStep].content.html} */}
            {steps[activeStep].content ? (
              htmlToReactParser.parseWithInstructions(
                steps[activeStep].content.html,
                isValidNode,
                processingInstructions
              )
            ) : (
              <React.Fragment />
            )}
            {steps[activeStep].content.multipleChoice ? (
              steps[activeStep].content.multipleChoice.map((data, index) => {
                return <MultipleChoice key={index} data={data} />;
              })
            ) : (
              <React.Fragment />
            )}
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
          </React.Fragment>
        </Paper>
        <AddButton add="step" />
      </React.Fragment>
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
  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
});

export default StepsPage;
