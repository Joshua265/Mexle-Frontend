import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import HtmlToReactParser from "html-to-react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Backdrop,
  Paper,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import FinishPage from "components/FinishPage";

import StepsProgress from "components/StepsProgress";
import AddButton from "container/AddButton";
import webServiceProvider from "helpers/webServiceProvider";
import { useRootStore } from "context/RootStateContext";
import CreateStep from "components/CreateStep";
import MultipleChoice from "components/MultipleChoice";
import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";

import checkForEditShow from "helpers/checkForEditShow";
import {
  htmlToReactParser,
  isValidNode,
  processingInstructions,
} from "helpers/transform";

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
    height: "calc(100vh - 112px)",
  },
  contentShift: {
    marginTop: 0,
    marginRight: 0,
    padding: 20,
    overflowX: "hidden",
    width: `calc(100% - ${drawerWidth}px - 40)`,
    marginLeft: drawerWidth + 20,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: "calc(100vh - 112px)",
  },
  titlePaper: {
    position: "sticky",
    top: "-20px",
    paddingTop: 20,
    margin: -20,
    marginBottom: 0,
  },
}));

interface Icontent {
  html: String;
  multipleChoice: any;
}

interface IChapters {
  _id: string;
  courseId: string;
  author: string;
  title: string;
  description: string;
}

interface IStep {
  _id: string;
  chapterId: string;
  title: string;
  author: string;
  description: string;
  content: Icontent;
}

function StepsPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<IStep[]>([]);
  const [error, setError] = useState(false);
  const [chapter, setChapter] = useState<IChapters>();
  const [open, setOpen] = useState(false);
  const [openStepProgress, setOpenStepProgress] = useState(true);
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();
  const { userStore } = useRootStore();
  const chapterId = location.pathname.split("/")[3];

  useEffect(() => {
    fetchSteps();
    fetchChapter();
  }, []);

  const getActiveStep = (step) => {
    setCurrentStep(step);
  };

  const handleMarkFinished = () => {
    if (currentStep === steps.length - 1) {
      setCurrentStep(-1);
    } else {
      setCurrentStep(currentStep + 1);
    }
    userStore.addFinished("step", steps[currentStep]._id);
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
      <React.Fragment>
        <StepsProgress
          steps={steps}
          activeStepCallback={getActiveStep}
          open={openStepProgress}
        />
        <Paper
          className={openStepProgress ? classes.contentShift : classes.content}
          elevation={1}
        >
          <Paper className={classes.titlePaper} elevation={1}>
            <Typography variant="h6" component="h1">
              <IconButton
                edge="start"
                // className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => setOpenStepProgress(!openStepProgress)}
              >
                <MenuIcon />
              </IconButton>
              {chapter ? chapter.title : ""} | {steps[currentStep].title}
            </Typography>
            {
              //only show editButton and edit to certain users
              checkForEditShow(
                userStore.userData,
                steps[currentStep].author
              ) ? (
                <React.Fragment>
                  <Button onClick={() => setOpen(true)}>{t("edit")}</Button>
                  <CreateStep
                    edit={true}
                    open={open}
                    handleClose={() => setOpen(false)}
                    id={steps[currentStep]._id}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment />
              )
            }
          </Paper>

          <React.Fragment>
            {/* {steps[currentStep].content.html} */}
            {steps[currentStep].content ? (
              htmlToReactParser.parseWithInstructions(
                steps[currentStep].content.html,
                isValidNode,
                processingInstructions
              )
            ) : (
              <React.Fragment />
            )}
            {steps[currentStep].content.multipleChoice ? (
              steps[currentStep].content.multipleChoice.map((data, index) => {
                return <MultipleChoice key={index} data={data} />;
              })
            ) : (
              <React.Fragment />
            )}
            <Divider style={{ margin: 12 }} />
            <Button
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              {t("back")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleMarkFinished}
            >
              {currentStep === steps.length - 1
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
  return <Backdrop open={true} />;
}

export default StepsPage;
