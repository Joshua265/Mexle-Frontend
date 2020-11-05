import { Breadcrumbs, Paper } from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";
import React from 'react';

const useStyles = makeStyles ((theme) => ({
    title: {
      
    } 
  })
)

function SecondHeader() {
  const classes = useStyles();
  return (
    <Paper elevation={2}>
      <h1 className={classes.title}>Title</h1>
      <Breadcrumbs/>
    </Paper>
  )
}

export default SecondHeader;