import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Paper from '@material-ui/core/Paper';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import PrivateRoute from 'PrivateRoute';
import { AuthContext } from "context/auth";

import Header from "components/header";
import Sidebar from "components/Sidebar";

import Topics from "components/Topics";
import LoginPage from "components/Login";
import CreateCourse from "components/CreateCourse";



export default function App() {
  const [open, setOpen ] = useState(false);
  const [prefersDarkMode, setPreferesDarkMode] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const toggleDarkMode = () => {
    setPreferesDarkMode(!prefersDarkMode);
  }
  

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );


  return (
  <ThemeProvider theme={theme} >
    <CssBaseline/>
    <AuthContext.Provider value={true}>
      <Router>
        
          <Header handleDrawer={handleDrawer} toggleDarkMode={toggleDarkMode}/>
          <Sidebar open={open}/>
          
          <Switch>
            <Route path="/" exact component={Topics}/> 
            <Route path="/login" exact component={LoginPage}/>
            <PrivateRoute path="/create" exact component={CreateCourse}/>
          </Switch>
        
        
      </Router>
    </AuthContext.Provider>
  </ThemeProvider>
  );
}

