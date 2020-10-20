import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton, Switch} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    header: {
      position: "relative",
      flexGrow: 1,
      zIndex: 1400,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

function Header(props) {
    const classes = useStyles();
    
    return (
    <div className={classes.header}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={props.handleDrawer}>
          <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" className={classes.title}>
            E-learning Plattform
          </Typography>
          <Switch label="Dark Mode" onChange={props.toggleDarkMode}/>
          <Link to="/login" className="buttonLink">
            <Button color="inherit">
              <AccountCircleIcon/>
            </Button>
          </Link>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
  
export default Header;