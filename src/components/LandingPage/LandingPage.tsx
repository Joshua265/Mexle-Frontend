import React, { useState, useEffect, FC } from "react";
import {
  Typography,
  Button,
  Paper,
  Select,
  MenuItem,
  Box,
  Collapse,
  Grow,
  Card,
  Slide,
  useTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Background from "images/circuit.jpg";
import Vision from "./Vision";
import FeatureGrid from "./FeatureGrid";
import Title from "./Title";

const useStyles = makeStyles((theme: any) => {
  return {
    picture: {
      position: "absolute",
      top: 0,
      width: "100%",
      minHeight: "100vh",
      backgroundImage: `url(${Background})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      margin: 0,
      alignItems: "center",
      clipPath: "circle(900px at 100% 400px)",
      filter: "brightness(0.5)",
    },
    title: {
      position: "absolute",
      top: "50%",
      marginLeft: theme.spacing(4),
      msTransform: "translateY(-70%)",
      transform: "translateY(-70%)",
      fontWeight: "bold",
      filter: "brightness(1)",
    },
    rightFloat: {
      position: "absolute",
      right: theme.spacing(16),
      msTransform: "translateY(-50%)",
      transform: "translateY(-50%)",
    },
    quote: {
      position: "absolute",
      bottom: theme.spacing(8),
      left: theme.spacing(8),
    },
  };
});

const LandingPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <>
      <div className={classes.picture} />
      <div className={classes.title}>
        <Title checked={checked} />
      </div>
      <Slide
        in={checked}
        direction="up"
        {...(checked ? { timeout: 3500 } : {})}
      >
        <div className={classes.quote}>
          <Typography variant="h4" component="h4">
            Stelle Dir eine Welt vor in der jeder frei{" "}
            <Box color="text.hint" display="inline">
              MINT
            </Box>{" "}
            lernen kann.
          </Typography>
          <Typography variant="body1" component="h4">
            - frei nach{" "}
            <Box color="text.hint" display="inline">
              Jimmy Wales
            </Box>{" "}
            (Wikipedia Gründer)
          </Typography>
        </div>
      </Slide>
      <Grow
        in={checked}
        style={{ transformOrigin: "100 0 0" }}
        {...(checked ? { timeout: 2000 } : {})}
      >
        <div className={classes.rightFloat}>
          <FeatureGrid />
        </div>
      </Grow>
    </>
  );
};

export default LandingPage;
