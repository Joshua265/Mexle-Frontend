import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { Slide as TransitionSlide } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { TransitionProps } from "@material-ui/core/transitions";
import { Grid, AppBar, Dialog } from "@material-ui/core";
import webServiceProvider from "helpers/webServiceProvider";
import {
  htmlToReactParser,
  isValidNode,
  processingInstructions,
} from "helpers/transform";
import { RootStoreContext } from "stores/RootStore";
import BlockEditor from "container/BlockEditor";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  grid: {
    padding: theme.spacing(2),
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
  handleClose(): void;
  edit?: boolean;
  id?: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <TransitionSlide direction="up" ref={ref} {...props} />;
});

const CreateStep = observer((props: IProps) => {
  const classes = useStyles();
  const { editorStore } = useContext(RootStoreContext);

  useEffect(() => {
    editorStore.clearStep();
    const fetchStep = async () => {
      const step = await webServiceProvider.get(`steps/${props.id}`);
      editorStore.initStep(step);
    };

    if (props.open && props.edit) {
      console.log("fetchStep");
      editorStore.edit = true;
      fetchStep();
    }
  }, [props.open, props.edit, editorStore, props.id]);

  const handleClose = () => {
    editorStore.clearStep();
    props.handleClose();
  };

  const handleSave = () => {
    editorStore.saveStep();
    handleClose();
  };

  // const handleFormChange = (e: any) => {
  //   e.preventDefault();
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const addMultipleChoiceQuestion = () => {
  //   console.log(content.multipleChoice);
  //   if (content.multipleChoice) {
  //     const list = content.multipleChoice;
  //     list.push({
  //       question: "",
  //       answers: [],
  //       correctAnswer: -1,
  //     });
  //     setcontent({ ...content, multipleChoice: list });
  //   } else {
  //     const list: IMultipleChoice[] = [];
  //     list.push({
  //       question: "",
  //       answers: [],
  //       correctAnswer: -1,
  //     });
  //     setcontent({ ...content, multipleChoice: list });
  //   }
  // };

  // const saveMultipleChoice = (index: number, data: IMultipleChoice) => {
  //   const list = content.multipleChoice;
  //   list[index] = data;
  //   setcontent({ ...content, multipleChoice: list });
  // };

  // const removeMultipleChoiceQuestion = (index: number) => {
  //   setcontent({
  //     ...content,
  //     multipleChoice: content.multipleChoice.filter(
  //       (item: IMultipleChoice, id: number) => id !== index
  //     ),
  //   });
  // };

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

      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} xl={6} lg={6}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              name="title"
              label="Titel"
              value={editorStore.step.title}
              onChange={(e) => (editorStore.step.title = e.target.value)}
            />
            <TextField
              name="description"
              label="Beschreibung"
              value={editorStore.step.description}
              multiline
              rows={4}
              onChange={(e) => (editorStore.step.description = e.target.value)}
            />
          </div>

          {/* <CustomCKEditor
            data={content.html}
            onChange={(data: any) => setcontent({ ...content, html: data })}
          /> */}
          <BlockEditor
            html={props.edit ? editorStore.step.content.html : undefined}
          />
        </Grid>

        <Grid item xs={12} xl={6} lg={6}>
          {/* <div>{JSON.stringify(editorStore.step.content.html)}</div> */}
          <div>
            {htmlToReactParser.parseWithInstructions(
              editorStore.step.content.html,
              isValidNode,
              processingInstructions
            )}
          </div>

          {/* {content.multipleChoice ? (
            content.multipleChoice.map(
              (data: IMultipleChoice, index: number) => {
                return <MultipleChoice key={index} data={data} />;
              }
            )
          ) : (
            <React.Fragment />
          )} */}
        </Grid>
      </Grid>
    </Dialog>
  );
});

export default CreateStep;
