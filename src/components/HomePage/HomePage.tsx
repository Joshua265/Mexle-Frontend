import { Button, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React from "react";

function HomePage() {
  const history = useHistory();
  return (
    <Paper>
      <Typography variant="h2">Willkommen im E-Learning des Mexle</Typography>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => history.push("/courses")}
      >
        Zu den Kursen
      </Button>
    </Paper>
  );
}

export default HomePage;
