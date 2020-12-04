import React, { useState, useEffect, FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useRootStore } from "context/RootStateContext";

import { ThemeProvider } from "@material-ui/core/styles";
import { Backdrop, CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { observer } from "mobx-react";

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
import SignUpPage from "components/SignUpPage";

import getTheme from "helpers/theme";

const ThemeSelector = observer(({ children }) => {
  // const darkMode = cookies.get("darkMode") === "true" ? true : false || false;
  const { localStore } = useRootStore();
  const theme = getTheme(localStore.getDarkMode());
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
});

const App: FC = () => {
  const { localStore, userStore } = useRootStore();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(getTheme(localStore.darkMode));

  const handleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    localStore.initLocalVariables();
  }, []);

  return (
    <ThemeSelector>
      <SnackbarProvider>
        <CssBaseline />
        <Router>
          <Header />
          <SecondHeader />

          <Sidebar open={open} />

          <Switch>
            <Route path="/" exact component={HomePage} />
            <PrivateRoute path="/courses" exact component={Courses} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={SignUpPage} />
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
      </SnackbarProvider>
    </ThemeSelector>
  );
};

export default App;
