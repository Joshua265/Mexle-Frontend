import {
  Avatar,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { RootStoreContext } from "stores/RootStore";
import { useHistory } from "react-router-dom";
import MexleCoin from "images/MexleCoin";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: 120,
    height: 120,
  },
  header: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(0, 2, 3, 2),
  },
  mexleCoin: {
    width: 48,
    height: 48,
  },
  list: {
    backgroundColor: theme.palette.background.default,
  },
  actionButtons: {
    margin: theme.spacing(2, 2, 0, 0),
    maxWidth: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  changePasswordButton: {
    margin: theme.spacing(0, 0, 4, 0),
  },
}));

export default function AccountInformation() {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const { userStore } = useContext(RootStoreContext);

  const handleLogout = async () => {
    await userStore.logout();
    history.push("/login");
  };

  return (
    <Paper>
      <div className={classes.header}>
        <Avatar src={userStore.userData.avatar} className={classes.avatar}>
          {userStore.userData.username[0]}
        </Avatar>
        <Typography variant="h4" component="h5">
          {userStore.userData.username}
        </Typography>
        <MexleCoin className={classes.mexleCoin} />
      </div>

      <List className={classes.list}>
        <ListItem>
          <ListItemText
            primary={`${t("username")}: ${userStore.userData.username}`}
          />
          <ListItemSecondaryAction>
            <Button
              color="secondary"
              variant="contained"
              aria-label="editUsername"
            >
              {t("edit")}
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`${t("email")}: ${userStore.userData.email}`}
          />
          <ListItemSecondaryAction>
            <Button
              color="secondary"
              variant="contained"
              aria-label="editUsername"
            >
              {t("edit")}
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`${t("description")}: ${userStore.userData.description}`}
          />
          <ListItemSecondaryAction>
            <Button
              color="secondary"
              variant="contained"
              aria-label="editUsername"
            >
              {t("edit")}
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <div className={classes.actionButtons}>
        <Button
          color="secondary"
          variant="contained"
          className={classes.changePasswordButton}
        >
          {t("changePassword")}
        </Button>
        <Button color="primary" variant="contained" onClick={handleLogout}>
          {t("logout")}
        </Button>
      </div>
    </Paper>
  );
}
