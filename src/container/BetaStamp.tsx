import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    opacity: 0.5,
    zIndex: 90000
  }
}));

const BetaStamp = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Typography variant="h5" className={classes.root}>
      BETA v{process.env.REACT_APP_VERSION}
    </Typography>
  );
};

export default BetaStamp;
