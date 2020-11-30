import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useRootStore } from "context/RootStateContext";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import PrivateRoute from "PrivateRoute";

import Header from "components/header";
import Sidebar from "components/Sidebar";

import Courses from "components/Courses";
import LoginPage from "components/Login";
import AccountPage from "components/AccountPage";
import StepsPage from "components/StepsPage";
import ChapterPage from "components/ChapterPage";
import HomePage from "components/HomePage";
import SecondHeader from "components/SecondHeader/SecondHeader";

export default function App() {
  const [open, setOpen] = useState(false);
  const { localStore } = useRootStore();

  const handleDrawer = () => {
    setOpen(!open);
  };

  console.log(localStore.darkMode);

  const theme = createMuiTheme({
    palette: {
      type: "light", //localStore.darkMode ? "dark" : "light",
      primary: {
        main: "#006A00",
        light: "#006A00",
        dark: "#35D435",
      },
      secondary: {
        main: "#62929E",
        light: "#62929E",
        dark: "#62929E",
      },
    },
    overrides: {
      MuiPaper: {
        elevation1: {
          margin: "20px",
          padding: "20px",
          boxSizing: "border-box",
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
        <Header handleDrawer={handleDrawer} />
        <SecondHeader />

        <Sidebar open={open} />

        <Switch>
          <Route path="/" exact component={HomePage} />
          <PrivateRoute path="/courses" exact component={Courses} />
          <Route path="/login" exact component={LoginPage} />
          <PrivateRoute
            path="/courses/:CourseId"
            exact
            component={ChapterPage}
          />
          <PrivateRoute
            path="/courses/:CourseId/:ChapterId"
            exact
            component={StepsPage}
          />
          <PrivateRoute path="/account" exact component={AccountPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
