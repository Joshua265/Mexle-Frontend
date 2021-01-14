import React, { useState, useEffect, useContext } from "react";
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
import { MenuItem, Paper, Select } from "@material-ui/core";
import webServiceProvider from "helpers/webServiceProvider";
import { useTranslation } from "react-i18next";
import languages from "helpers/languages";
import axios from "axios";
import { useSnackbar } from "notistack";
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
}));

interface IForm {
  title?: string;
  description?: string;
  picture?: string;
  visible?: boolean;
  language: string;
  license?: string;
  directory?: Object;
  _id: string;
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

function CreateCourse(props: IProps) {
  const classes = useStyles();
  const { userStore } = useContext(RootStoreContext);
  const { t, i18n } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [licenses, setLicenses] = useState<Array<any>>([]);
  const [form, setForm] = useState(
    props.edit && props.data
      ? {
          title: props.data.title,
          description: props.data.description || "",
          picture: props.data.picture,
          visible: props.data.visible,
          language: props.data.language,
          license: props.data.license,
          directory: props.data.directory,
        }
      : {
          title: "",
          description: "",
          picture: "",
          visible: true,
          language: i18n.language,
          license: "-",
          directory: {},
        }
  );

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  useEffect(() => {
    getLicenses();
  }, []);

  const getLicenses = async () => {
    try {
      let licenses = await axios.get("https://api.github.com/licenses");
      licenses.data.push({ key: "-", name: "-" });
      setLicenses(licenses.data);
    } catch (e) {
      enqueueSnackbar("Error fetching Licenses", { variant: "error" });
    }
  };

  const handleClose = () => {
    setOpen(false);
    props.handleClose();
  };

  const handleSave = async () => {
    if (props.edit && props.data) {
      await webServiceProvider.post(`courses/edit/${props.data._id}`, form);
    } else {
      await webServiceProvider.post("courses/create", form);
    }
    handleClose();
  };

  const handleFormChange = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
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
            {props.edit ? "Kurs Bearbeiten" : "Neuen Kurs erstellen"}
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
          <Select
            name="language"
            value={form.language}
            onChange={(e) =>
              setForm({ ...form, language: String(e.target.value) })
            }
          >
            {languages.map((lng) => {
              return (
                <MenuItem value={lng.value} key={lng.value}>
                  {lng.label}
                </MenuItem>
              );
            })}
          </Select>

          {licenses ? (
            <Select
              name="license"
              value={form.license}
              onChange={(e) =>
                setForm({ ...form, license: String(e.target.value) })
              }
            >
              {licenses.map((l) => {
                return (
                  <MenuItem value={l.key} key={l.key}>
                    {l.name}
                  </MenuItem>
                );
              })}
            </Select>
          ) : (
            <Select name="license" disabled />
          )}
        </form>
      </Paper>
    </Dialog>
  );
}

export default CreateCourse;
