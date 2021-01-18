import React, { useContext, useState } from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ImageUploader from "react-images-upload";
import webServiceProvider from "helpers/webServiceProvider";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { RootStoreContext } from "stores/RootStore";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

interface ImageObject {
  _id: string;
  url: string;
}

const defaultImageObject: ImageObject = { _id: "", url: "" };

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    overflow: "hidden",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ChangeAvatarDialog(props) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { userStore } = useContext(RootStoreContext);
  const [image, setImage] = useState<ImageObject>(defaultImageObject);

  const handleSave = async () => {
    try {
      await webServiceProvider.post("user/changeavatar", {
        avatar: image._id,
      });
      userStore.userData.avatar = image._id;
      userStore.avatarUrl = image.url;
      handleClose();
    } catch (e) {
      enqueueSnackbar(t("couldnotchangeAvatar"), { variant: "error" });
    }
  };

  const handleClose = () => {
    setImage(defaultImageObject);
    props.closeCallback();
  };

  const onDrop = async (pictureFiles, pictureDataURLs) => {
    try {
      const res = await webServiceProvider.post("images/upload", {
        upload: pictureDataURLs[0],
      });
      if (res.status) {
        setImage({ _id: res.response.imageId, url: res.response.url });
      } else {
        throw new Error();
      }
    } catch (e) {
      enqueueSnackbar(t("couldnotuploadimage"), { variant: "error" });
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Modal title
      </DialogTitle>
      <DialogContent dividers>
        {image === defaultImageObject ? (
          <ImageUploader
            withIcon
            singleImage
            label={t("Max file size: 5mb, accepted: jpg, jpeg, png")}
            labelStyles={{ color: "black" }}
            buttonText={t("Choose images")}
            onChange={onDrop}
            imgExtension={[".jpg", ".png", "jpeg"]}
            maxFileSize={5242880}
          />
        ) : (
          <img src={image.url} style={{ width: 120, height: 120 }} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          {t("save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
