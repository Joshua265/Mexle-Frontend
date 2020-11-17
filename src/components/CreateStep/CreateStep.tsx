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
import ReactHtmlParser from "react-html-parser";
import transform from "helpers/transform";
import CreateMultipleChoice from "components/CreateMultipleChoice";
import MultipleChoice from "components/MultipleChoice";
import { useRootStore } from "context/RootStateContext";
import CustomCKEditor from "container/CustomCKEditor";

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
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateStep(props: IProps) {
  const classes = useStyles();
  const location = useLocation();
  const { userStore } = useRootStore();
  const [open, setOpen] = useState(false);
  const [metadata, setMetadata] = useState<IMetadata>({
    html: "",
    multipleChoice: [],
  });
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: userStore.username,
    chapterId: location.pathname.split("/")[3],
  });

  const fetchStep = async () => {
    const step = await webServiceProvider.get(`steps/${props.id}`);
    setMetadata(step.metadata);
    setForm({ ...form, title: step.title, description: step.description });
  };

  useEffect(() => {
    if (props.edit) {
      fetchStep();
    }
  }, []);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = () => {
    setOpen(false);
    props.handleClose();
  };

  const handleSave = async () => {
    if (props.edit) {
      await webServiceProvider.post(`steps/edit/${props.id}`, {
        ...form,
        metadata,
        author: userStore.username,
      });
    } else {
      await webServiceProvider.post("steps/create", {
        ...form,
        metadata,
        author: userStore.username,
      });
    }

    handleClose();
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addMultipleChoiceQuestion = () => {
    console.log(metadata.multipleChoice);
    if (metadata.multipleChoice) {
      const list = metadata.multipleChoice;
      list.push({
        question: "",
        answers: [],
        correctAnswer: -1,
      });
      setMetadata({ ...metadata, multipleChoice: list });
    } else {
      const list: IMultipleChoice[] = [];
      list.push({
        question: "",
        answers: [],
        correctAnswer: -1,
      });
      setMetadata({ ...metadata, multipleChoice: list });
    }
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
            {props.edit ? "Schritt Bearbeiten" : "Neuen Schritt erstellen"}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            {props.edit ? "Ändern" : "Hinzufügen"}
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
          <TextField name="title" label="Titel" value={form.title} />
          <TextField
            name="description"
            label="Beschreibung"
            value={form.description}
            multiline
            rows={4}
          />
        </form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomCKEditor
              data={metadata.html}
              onChange={(data) => setMetadata({ ...metadata, html: data })}
            />
            <Button onClick={addMultipleChoiceQuestion}>
              Multiple Choice Frage Hinzufügen
            </Button>

            {metadata.multipleChoice ? (
              metadata.multipleChoice.map((mcQuestion, index) => {
                return (
                  <Card className={classes.mcCard} variant="outlined">
                    <CardContent>
                      <Button
                        onClick={() => removeMultipleChoiceQuestion(index)}
                      >
                        Frage Löschen
                      </Button>
                      <CreateMultipleChoice
                        key={index}
                        data={mcQuestion}
                        saveCallback={saveMultipleChoice}
                        id={index}
                      />
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <React.Fragment />
            )}
          </Grid>

          <Grid item xs={6}>
            {/* <div>{data}</div> */}
            <div>
              {ReactHtmlParser(metadata.html, { transform: transform })}
            </div>

            {metadata.multipleChoice ? (
              metadata.multipleChoice.map((data, index) => {
                return <MultipleChoice key={index} data={data} />;
              })
            ) : (
              <React.Fragment />
            )}
            {/* <iframe
              style={{ width: "100%", minHeight: "400px" }}
              src="https://www.falstad.com/circuit/circuitjs.html?cct=$+17+0.00005+0.6255+85+2+50%0Ab+192+144+524+360+0%0Ax+231+131+426+134+4+20+reale%5CsDiode%5Cs(%C2%B1500mV)%0Ag+224+288+224+320+0%0A34+1N4148_+0+4.352e-9+0.6458+1.906+110%0Ad+224+208+224+288+2+1N4148_%0AR+224+208+224+176+0+3+50+0.5+0+0+0.5%0A403+272+176+512+352+0+4_64_0_4167_1.25e-56_8e-57_1_2_4_3%0AR+-128+208+-128+176+0+3+50+0.95+0+0+0.5%0Ad+-128+208+-128+288+2+1N4148_%0Ag+-128+288+-128+336+0%0Ax+-91+129+104+132+4+20+reale%5CsDiode%5Cs(%C2%B1950mV)%0Ab+-160+144+172+360+0%0A403+-80+176+160+352+0+7_512_0_4161_5e-96_1.6e-96_0_2_7_3%0Ax+46+185+51+188+4+18+I%0Ax+398+181+403+184+4+18+I%0Ax+152+285+164+288+4+18+U%0Ax+501+283+513+286+4+18+U%0Ax+74+286+111+289+4+18+0,7V%0Ax+101+269+105+272+4+18+%7C%0Ax+444+289+481+292+4+18+0,4V%0Ax+467+271+471+274+4+18+%7C%0Ax+299+247+311+250+4+18+U%0Ax+315+254+325+257+4+18+Z%0AR+576+208+576+176+0+3+50+0.3+0+0+0.5%0Ad+576+208+576+288+2+1N4148_%0Ag+576+288+576+320+0%0A403+624+176+864+352+0+23_512_0_4161_5e-48_4e-46_0_2_23_3%0Ab+541+144+873+360+0%0Ax+580+131+775+134+4+20+reale%5CsDiode%5Cs(%C2%B1300mV)%0Ax+747+181+752+184+4+18+I%0Ax+850+283+862+286+4+18+U%0Ax+774+292+811+295+4+18+0,2V%0Ax+795+272+799+275+4+18+%7C%0Ax+648+247+660+250+4+18+U%0Ax+664+254+674+257+4+18+Z%0Ax+329+223+381+226+4+18+100%CE%BCA%0Ax+387+214+397+217+4+18+_%0Ax+695+228+727+231+4+18+1%CE%BCA%0Ax+739+219+749+222+4+18+_%0Ax+34+223+44+226+4+18+_%0Ax+-24+229+33+232+4+18+100mA%0Ax+-43+79+674+82+4+24+Abh%C3%A4ngigkeit%5Csder%5CsDiodenkennlinie%5Csvom%5CsStrom(/Spannungs-)bereich%5Cs%0A"
            /> */}
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
}

export default CreateStep;
