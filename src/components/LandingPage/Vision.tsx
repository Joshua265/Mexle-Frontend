import React from "react";
import {
  Grid,
  Card,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

//icons
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import SwapCallsIcon from "@material-ui/icons/SwapCalls";
import FeedbackIcon from "@material-ui/icons/Feedback";

import UpdateIcon from "@material-ui/icons/Update";
import PublicIcon from "@material-ui/icons/Public";
import SearchIcon from "@material-ui/icons/Search";

import SchoolIcon from "@material-ui/icons/School";
import GroupIcon from "@material-ui/icons/Group";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

const useStyles = makeStyles((theme: any) => {
  return {
    card: {
      height: "350px",
    },
  };
});

const Vision = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid item xs={3} component={Card} className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Motivation und Förderung
          </Typography>
        </CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <SportsEsportsIcon />
            </ListItemIcon>
            <ListItemText primary="Spielerisch" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SwapCallsIcon />
            </ListItemIcon>
            <ListItemText primary="Flexibel" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary="Konstruktives Feedback" />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={3} component={Card} className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Selbstbestimmung und Struktur
          </Typography>
        </CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <UpdateIcon />
            </ListItemIcon>
            <ListItemText primary="Zeitsouverän" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PublicIcon />
            </ListItemIcon>
            <ListItemText primary="Ortsunabhängig" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Auffindbar" />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={3} component={Card} className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Offenheit und Diskretion
          </Typography>
        </CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Open Educational ResSource" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Community-getrieben" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmojiEmotionsIcon />
            </ListItemIcon>
            <ListItemText primary="Freundliche Lernumgebung" />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default Vision;
