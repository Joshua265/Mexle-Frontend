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
import { Grid, Paper } from "@material-ui/core";
import webServiceProvider from "helpers/webServiceProvider";
import { useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import YouTube from "react-youtube";
import MyCustomUploadAdapterPlugin from "utils/MyCustomUploadAdapterPlugin";

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

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

function transform(node) {
  // change render of youtube videos
  if (node.type === "tag" && node.name === "oembed") {
    console.log(node);
    return (
      <YouTube
        videoId={node.attribs.url.replace(
          "https://www.youtube.com/watch?v=",
          ""
        )}
      />
    );
  }
  return;
}

interface IForm {
  title: any;
  description: any;
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
  const [data, setData] = useState("");
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
    await webServiceProvider.post("steps/create", form);
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
              data={data}
              config={{
                extraPlugins: [MyCustomUploadAdapterPlugin],
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setData(data);
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <div>{data}</div>
            <div>{ReactHtmlParser(data, { transform: transform })}</div>
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
}

export default CreateStep;
