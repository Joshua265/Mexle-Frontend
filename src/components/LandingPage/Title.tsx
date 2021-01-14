import React from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import { Typography, Box, Grow } from "@material-ui/core";

const Title = (props) => {
  const theme = useTheme();
  return (
    <>
      <Grow
        in={props.checked}
        style={{ transformOrigin: "0 0 0" }}
        {...(props.checked ? { timeout: 1000 } : {})}
      >
        <Typography variant="h1" component="h4">
          <Box fontWeight="fontWeightBold" color="text.hint" display="inline">
            M
          </Box>
          ultimodale
        </Typography>
      </Grow>
      <Grow
        in={props.checked}
        style={{ transformOrigin: "0 0 0" }}
        {...(props.checked ? { timeout: 1500 } : {})}
      >
        <Typography variant="h1" component="h4">
          <Box fontWeight="fontWeightBold" color="text.hint" display="inline">
            EX
          </Box>
          perimentier- und
        </Typography>
      </Grow>
      <Grow
        in={props.checked}
        style={{ transformOrigin: "0 0 0" }}
        {...(props.checked ? { timeout: 2000 } : {})}
      >
        <Typography variant="h1" component="h4">
          <Box fontWeight="fontWeightBold" color="text.hint" display="inline">
            LE
          </Box>
          rnumgebung
        </Typography>
      </Grow>
    </>
  );
};

export default Title;
