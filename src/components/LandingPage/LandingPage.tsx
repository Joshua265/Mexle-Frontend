import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grow,
  Fade,
  Slide,
  withWidth,
  isWidthDown,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Background from "images/circuit.jpg";
import FeatureGrid from "./FeatureGrid";
import Title from "./Title";
import MobileTitle from "./MobileTitle";

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
      top: theme.spacing(16),
      marginLeft: theme.spacing(8),
      maxWidth: "50vw",
      fontWeight: "bold",
      filter: "brightness(1)",
    },
    rightFloat: {
      position: "absolute",
      right: theme.spacing(8),
      msTransform: "translateY(-50%)",
      transform: "translateY(-50%)",
    },
    quote: {
      position: "absolute",
      bottom: theme.spacing(8),
      left: theme.spacing(8),
    },
    mobileRoot: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100vh", //`calc(100vh - ${theme.mixins.toolbar.height}px)`,
      padding: theme.spacing(2),
      textAlign: "center",
    },
    mobilePicture: {
      width: "100%",
      height: "100%",
      backgroundImage: `url(${Background})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      // clipPath: "circle(50% at 50% 100%)",
      filter: "brightness(0.5)",
    },
    mobileTitle: {
      fontWeight: "bold",
      filter: "brightness(1)",
    },

    mobileRightFloat: {},
    mobileQuote: {},
  };
});

const LandingPage = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const width = props.width;

  useEffect(() => {
    setChecked(true);
  }, []);

  if (isWidthDown("sm", width)) {
    return (
      <div className={classes.mobileRoot}>
        <MobileTitle checked={checked} className={classes.mobileTitle} />
        <div className={classes.mobileTitle}>
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

        <Grow
          in={checked}
          style={{ transformOrigin: "100 0 0" }}
          {...(checked ? { timeout: 2000 } : {})}
        >
          <div className={classes.mobilePicture}>
            <div className={classes.mobileRightFloat}>
              <FeatureGrid />
            </div>
          </div>
        </Grow>
      </div>
    );
  }

  return (
    <>
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
      <div className={classes.picture} />
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

export default withWidth()(LandingPage);
