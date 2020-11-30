import { Button, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { RevealJS, Slide, H } from "revealjs-react";
import RevealHighlight from "revealjs-react/plugins/highlight";
import CustomCKEditor from "container/CustomCKEditor/CustomCKEditor";

function HomePage() {
  const history = useHistory();
  const [data, setData] = useState("");
  return (
    <React.Fragment>
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
      <CustomCKEditor data={data} onChange={(data) => setData(data)} />
      {data}
    </React.Fragment>
  );
}

export default HomePage;
