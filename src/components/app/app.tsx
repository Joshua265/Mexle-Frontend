import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "universal-cookie";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import PrivateRoute from "PrivateRoute";

import Header from "components/header";
import Sidebar from "components/Sidebar";

import Courses from "components/Courses";
import LoginPage from "components/Login";
import CreateCourse from "components/CreateCourse";
import AccountPage from "components/AccountPage";
import StepsPage from "components/StepsPage";
import ChapterPage from "components/ChapterPage";
import SecondHeader from "components/SecondHeader/SecondHeader";

const cookies = new Cookies();

export default function App() {
  const [open, setOpen] = useState(false);
  const [prefersDarkMode, setPreferesDarkMode] = useState(
    cookies.get("darkMode") === "true" ? true : false || false
  );

  const handleDrawer = () => {
    setOpen(!open);
  };

  const toggleDarkMode = () => {
    cookies.set("darkMode", !prefersDarkMode, { path: "/" });
    setPreferesDarkMode(!prefersDarkMode);
  };

  const theme = createMuiTheme({
    palette: {
      type: prefersDarkMode ? "dark" : "light",
      primary: {
        main: "#62929E",
        light: "#EEE5E9",
        dark: "#62929E",
      },
      secondary: {
        main: "#35D435",
        light: "#546A7B",
        dark: "#35D435",
      },
    },
    overrides: {
      MuiPaper: {
        elevation1: {
          margin: "20px",
          padding: "20px",
          height: "89vh",
          overflow: "auto",
        },
        elevation2: {
          height: "46px",
          marginLeft: "20px",
          marginRight: "20px",
        },
      },
      MuiTypography: {
        h2: {
          margin: "20px",
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header
          handleDrawer={handleDrawer}
          toggleDarkMode={toggleDarkMode}
          darkMode={prefersDarkMode}
        />

        <Sidebar open={open} />

        <Switch>
          <Route path="/" exact component={Courses} />
          <Route path="/login" exact component={LoginPage} />
          <PrivateRoute
            path="/course/:CourseId"
            exact
            component={ChapterPage}
          />
          <PrivateRoute
            path="/course/:CourseId/:ChapterId"
            exact
            component={StepsPage}
          />
          <PrivateRoute path="/account" exact component={AccountPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
