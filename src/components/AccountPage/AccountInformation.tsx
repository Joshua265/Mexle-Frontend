import {
  Avatar,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Badge,
  IconButton,
} from "@material-ui/core";
import {
  withStyles,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { RootStoreContext } from "stores/RootStore";
import { useHistory } from "react-router-dom";
import MexleCoin from "images/MexleCoin";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ChangeAvatarDialog from "./ChangeAvatarDialog";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: 120,
    height: 120,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: theme.spacing(0, 2, 3, 2),
  },
  headerPart: {
    display: "flex",
    alignItems: "center",
    "& h5": {
      marginLeft: 20,
    },
  },
  mexleCoin: {
    width: 48,
    height: 48,
  },
  photoIcon: {
    width: 48,
    height: 48,
  },
  list: {
    backgroundColor: theme.palette.background.default,
  },
  actionButtons: {
    margin: theme.spacing(2, 3, 0, 0),
    maxWidth: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  changePasswordButton: {
    margin: theme.spacing(0, 0, 4, 0),
  },
}));

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      width: 48,
      height: 48,
      border: `4px solid ${theme.palette.background.paper}`,
    },
  })
)(Badge);

const AccountInformation = observer(() => {
  //hooks
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const { userStore } = useContext(RootStoreContext);
  //state
  const [openAvatarEdit, setOpenAvatarEdit] = useState(false);

  const handleLogout = async () => {
    await userStore.logout();
    history.push("/login");
  };

  return (
    <Paper>
      <div className={classes.header}>
        <div className={classes.headerPart}>
          <StyledBadge
            badgeContent={
              <IconButton
                onClick={() => setOpenAvatarEdit(true)}
                color="inherit"
              >
                <AddAPhotoIcon />
              </IconButton>
            }
            color="secondary"
            overlap="circle"
          >
            <Avatar src={userStore.avatarUrl} className={classes.avatar}>
              {userStore.userData.username[0]}
            </Avatar>
          </StyledBadge>

          <Typography variant="h4" component="h5">
            {userStore.userData.username}
          </Typography>
        </div>
        <div className={classes.headerPart}>
          <MexleCoin className={classes.mexleCoin} />
          <Typography variant="h4" component="h5">
            {userStore.userData.coins || 0}
          </Typography>
        </div>
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
      <ChangeAvatarDialog
        open={openAvatarEdit}
        closeCallback={() => setOpenAvatarEdit(false)}
      />
    </Paper>
  );
});

export default AccountInformation;
