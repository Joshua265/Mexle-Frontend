import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Cookies from 'universal-cookie';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import PrivateRoute from 'PrivateRoute';
import { AuthContext } from "context/auth";

import Header from "components/header";
import Sidebar from "components/Sidebar";

import Courses from "components/Courses";
import LoginPage from "components/Login";
import CreateCourse from "components/CreateCourse";
import CoursePage from "components/CoursePage";

const cookies = new Cookies();

export default function App() {
  const [open, setOpen ] = useState(false);
  const [prefersDarkMode, setPreferesDarkMode] = useState(cookies.get('darkMode', { path: '/' })==='true' ? true : false || false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const toggleDarkMode = () => {
    cookies.set('darkMode', !prefersDarkMode, { path: '/' }); 
    setPreferesDarkMode(!prefersDarkMode);
  }
  

  const theme = createMuiTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
    },
    overrides: {
      MuiPaper: {
        elevation1: {
          margin: '20px',
          padding: '20px'
        }
    }
    }
    
  });


  return (
  <ThemeProvider theme={theme} >
    <CssBaseline/>
    <AuthContext.Provider value={true}>
      <Router>

          <Header handleDrawer={handleDrawer} toggleDarkMode={toggleDarkMode} darkMode={prefersDarkMode}/>
          <Sidebar open={open}/>
          
          <Switch>
            <Route path="/" exact component={Courses}/> 
            <Route path="/login" exact component={LoginPage}/>
            <PrivateRoute path="/create" exact component={CreateCourse}/>
            <PrivateRoute path="/course/:title" exact component={CoursePage}/>
          </Switch>
        
        
      </Router>
    </AuthContext.Provider>
  </ThemeProvider>
  );
}

