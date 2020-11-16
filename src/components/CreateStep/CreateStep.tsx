import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import { TransitionProps } from "@material-ui/core/transitions";
import { Card, CardContent, Grid, Paper } from "@material-ui/core";
import webServiceProvider from "helpers/webServiceProvider";
import { useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import MyCustomUploadAdapterPlugin from "utils/MyCustomUploadAdapterPlugin";
import transform from "helpers/transform";
import CreateMultipleChoice from "components/CreateMultipleChoice";
import MultipleChoice from "components/MultipleChoice";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    marginTop: "64px",
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

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

interface IMetadata {
  html: string;
  multipleChoice: Array<IMultipleChoice>;
}

interface IMultipleChoice {
  question: string;
  answers: Array<IAnswer>;
  correctAnswer: number;
}

interface IAnswer {
  id: number;
  text: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateStep(props) {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [metadata, setMetadata] = useState<IMetadata>({
    html: "",
    multipleChoice: [],
  });
  const [form, setForm] = useState({
    title: "",
    description: "",
    chapterId: location.pathname.split("/")[3],
  });

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = () => {
    setOpen(false);
    props.handleClose();
  };

  const handleSave = async () => {
    await webServiceProvider.post("steps/create", { ...form, metadata });
    handleClose();
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addMultipleChoiceQuestion = () => {
    const list = metadata.multipleChoice;
    list.push({
      question: "",
      answers: [],
      correctAnswer: -1,
    });
    setMetadata({ ...metadata, multipleChoice: list });
  };

  const saveMultipleChoice = (index: number, data: IMultipleChoice) => {
    const list = metadata.multipleChoice;
    list[index] = data;
    setMetadata({ ...metadata, multipleChoice: list });
  };

  const removeMultipleChoiceQuestion = (index: number) => {
    setMetadata({
      ...metadata,
      multipleChoice: metadata.multipleChoice.filter(
        (item, id) => id !== index
      ),
    });
  };

  // console.log(metadata.multipleChoice);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
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
            Neuen Schritt erstellen
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            Hinzufügen
          </Button>
        </Toolbar>
      </AppBar>
      <Paper>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onChange={(e) => handleFormChange(e)}
        >
          <TextField name="title" label="Titel" />
          <TextField
            name="description"
            label="Beschreibung"
            multiline
            rows={4}
          />
        </form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CKEditor
              editor={ClassicEditor}
              data={metadata.html}
              config={{
                extraPlugins: [MyCustomUploadAdapterPlugin],
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setMetadata({ ...metadata, html: data });
              }}
            />
            <Button onClick={addMultipleChoiceQuestion}>
              Multiple Choice Frage Hinzufügen
            </Button>

            {metadata.multipleChoice.map((mcQuestion, index) => {
              return (
                <Card className={classes.mcCard} variant="outlined">
                  <CardContent>
                    <Button onClick={() => removeMultipleChoiceQuestion(index)}>
                      Frage Löschen
                    </Button>
                    <CreateMultipleChoice
                      key={index}
                      saveCallback={saveMultipleChoice}
                      id={index}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </Grid>

          <Grid item xs={6}>
            {/* <div>{data}</div> */}
            <div>
              {ReactHtmlParser(metadata.html, { transform: transform })}
            </div>

            {metadata.multipleChoice.map((data, index) => {
              return <MultipleChoice key={index} data={data} />;
            })}
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
}

export default CreateStep;
