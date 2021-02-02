import React from "react";
import { Typography, Box, Grow } from "@material-ui/core";

const MobileTitle = (props) => {
  return (
    <Grow
      in={props.checked}
      style={{ transformOrigin: "50 0 0" }}
      {...(props.checked ? { timeout: 1000 } : {})}
    >
      <Typography variant="h1" component="h4">
        <Box fontWeight="fontWeightBold" color="text.hint" display="inline">
          MEXLE
        </Box>
      </Typography>
    </Grow>
  );
};

export default MobileTitle;
