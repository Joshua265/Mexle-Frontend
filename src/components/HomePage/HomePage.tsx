import { Button, Paper, Typography, Select, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomCKEditor from "container/CustomCKEditor/CustomCKEditor";

function HomePage() {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState("");
  return (
    <React.Fragment>
      <Paper>
        <Typography variant="h2">{t("homepage")}</Typography>
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
