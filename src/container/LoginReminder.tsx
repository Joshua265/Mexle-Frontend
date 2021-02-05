import React, { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { RootStoreContext } from "stores/RootStore";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

export default function LoginReminder() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const { userStore, localStore } = useContext(RootStoreContext);
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (
      userStore.userData.loggedIn === false &&
      localStore.reminded === false
    ) {
      localStore.reminded = true;
      setOpen(true);
    }
  }, [localStore, userStore.userData.loggedIn]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    handleClose();
    history.push(`/login?path=${location.pathname}`);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {t("LoginReminder")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText color="textPrimary">
          {t("allFeaturesWithLogin")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          {t("continueWithoutLogin")}
        </Button>
        <Button onClick={handleLogin} color="primary" autoFocus>
          {t("login")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
