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
import { Paper } from "@material-ui/core";
import webServiceProvider from "helpers/webServiceProvider";
import { useLocation } from "react-router-dom";
import { useRootStore } from "context/RootStateContext";

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
}));

interface IForm {
  title?: string;
  description?: string;
  picture?: string;
  _id?: string;
}

interface IProps {
  open: boolean;
  handleClose: Function;
  edit: boolean;
  data?: IForm;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateChapter(props: IProps) {
  const classes = useStyles();
  const location = useLocation();
  const { userStore } = useRootStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(
    props.edit && props.data
      ? {
          title: props.data.title,
          description: props.data.description,
          picture: props.data.picture,
          author: userStore.username,
          courseId: location.pathname.split("/")[2],
        }
      : {
          title: "",
          description: "",
          picture: "",
          author: userStore.username,
          courseId: location.pathname.split("/")[2],
        }
  );

  console.log(props);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = () => {
    setOpen(false);
    props.handleClose();
  };

  const handleSave = async () => {
    await webServiceProvider.post("chapters/create", form);
    handleClose();
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
            {props.edit ? "Kapitel Bearbeiten" : "Neues Kapitel erstellen"}
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
          <TextField name="picture" label="Bild URL" value={form.picture} />
        </form>
      </Paper>
    </Dialog>
  );
}

export default CreateChapter;
