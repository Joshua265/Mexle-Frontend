import React, { useState, useEffect, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { Slide as TransitionSlide } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { TransitionProps } from "@material-ui/core/transitions";
import {
  Card,
  CardContent,
  Grid,
  Paper,
  AppBar,
  Dialog,
} from "@material-ui/core";
import webServiceProvider from "helpers/webServiceProvider";
import { useLocation } from "react-router-dom";
import CreateMultipleChoice from "components/CreateMultipleChoice";
import MultipleChoice from "components/MultipleChoice";
import CustomCKEditor from "container/CustomCKEditor/CustomCKEditor";
import {
  htmlToReactParser,
  isValidNode,
  processingInstructions,
} from "helpers/transform";
import { IStep, IAnswer, IMultipleChoice, IContent } from "types";
import { RootStoreContext } from "stores/RootStore";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  form: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
  mcCard: {
    minWidth: 275,
    height: "80%",
  },
}));

interface IProps {
  open: boolean;
  handleClose: Function;
  edit: boolean;
  id?: String;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <TransitionSlide direction="up" ref={ref} {...props} />;
});

function CreateStep(props: IProps) {
  const classes = useStyles();
  const location = useLocation();
  const { userStore } = useContext(RootStoreContext);
  const [content, setcontent] = useState<IContent>({
    html: "",
    multipleChoice: [],
  });
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: userStore.userData.username,
    visible: true,
    chapterId: location.pathname.split("/")[3],
  });

  const fetchStep = async () => {
    const step = await webServiceProvider.get(`steps/${props.id}`);
    setcontent(step.content);
    setForm({ ...form, title: step.title, description: step.description });
  };

  useEffect(() => {
    if (props.edit) {
      fetchStep();
    }
  }, [props.open]);

  const handleClose = () => {
    props.handleClose();
  };

  const handleSave = async () => {
    if (props.edit) {
      await webServiceProvider.post(`steps/edit/${props.id}`, {
        ...form,
        content,
        author: userStore.userData.username,
      });
    } else {
      await webServiceProvider.post("steps/create", {
        ...form,
        content,
        author: userStore.userData.username,
      });
    }

    handleClose();
  };

  const handleFormChange = (e: any) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addMultipleChoiceQuestion = () => {
    console.log(content.multipleChoice);
    if (content.multipleChoice) {
      const list = content.multipleChoice;
      list.push({
        question: "",
        answers: [],
        correctAnswer: -1,
      });
      setcontent({ ...content, multipleChoice: list });
    } else {
      const list: IMultipleChoice[] = [];
      list.push({
        question: "",
        answers: [],
        correctAnswer: -1,
      });
      setcontent({ ...content, multipleChoice: list });
    }
  };

  const saveMultipleChoice = (index: number, data: IMultipleChoice) => {
    const list = content.multipleChoice;
    list[index] = data;
    setcontent({ ...content, multipleChoice: list });
  };

  const removeMultipleChoiceQuestion = (index: number) => {
    setcontent({
      ...content,
      multipleChoice: content.multipleChoice.filter(
        (item: IMultipleChoice, id: number) => id !== index
      ),
    });
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleClose}
      TransitionComponent={Transition}
      disableEnforceFocus
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.edit ? "Schritt Bearbeiten" : "Neuen Schritt erstellen"}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            {props.edit ? "Ändern" : "Hinzufügen"}
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onChange={(e) => handleFormChange(e)}
          >
            <TextField name="title" label="Titel" value={form.title} />
            <TextField
              name="description"
              label="Beschreibung"
              value={form.description}
              multiline
              rows={4}
            />
          </form>
          <CustomCKEditor
            data={content.html}
            onChange={(data: any) => setcontent({ ...content, html: data })}
          />
          <Button onClick={addMultipleChoiceQuestion}>
            Multiple Choice Frage Hinzufügen
          </Button>

          {content.multipleChoice ? (
            content.multipleChoice.map(
              (mcQuestion: IMultipleChoice, index: number) => {
                return (
                  <React.Fragment>
                    <Button onClick={() => removeMultipleChoiceQuestion(index)}>
                      Frage Löschen
                    </Button>
                    {/* <CreateMultipleChoice
                    key={index}
                    data={mcQuestion}
                    saveCallback={saveMultipleChoice}
                    id={index}
                  /> */}
                  </React.Fragment>
                );
              }
            )
          ) : (
            <React.Fragment />
          )}
        </Grid>

        <Grid item xs={6}>
          <div>{JSON.stringify(content.html)}</div>
          <div>
            {htmlToReactParser.parseWithInstructions(
              content.html,
              isValidNode,
              processingInstructions
            )}
          </div>

          {content.multipleChoice ? (
            content.multipleChoice.map(
              (data: IMultipleChoice, index: number) => {
                return <MultipleChoice key={index} data={data} />;
              }
            )
          ) : (
            <React.Fragment />
          )}
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default CreateStep;