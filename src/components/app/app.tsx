import React, { useState, useEffect, FC } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useRootStore } from "context/RootStateContext";

import { ThemeProvider } from "@material-ui/core/styles";
import { Backdrop, CssBaseline, Slide, Collapse } from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import { SnackbarProvider } from "notistack";
import { observer } from "mobx-react-lite";

import PrivateRoute from "PrivateRoute";

import CollapseOnScroll from "container/CollapseOnScroll";
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
import LicensePage from "components/LicensePage";
import LandingPage from "components/LandingPage/LandingPage";
import { isObservable } from "mobx";

const ThemeSelector = observer(({ children }) => {
  const { localStore } = useRootStore();
  const theme = getTheme(localStore.localVariables.darkMode);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
});

function HideOnScroll({ children }: JSX.ElementChildrenAttribute) {
  const trigger = useScrollTrigger({ target: window });
  console.log(trigger);
  return <Collapse in={!trigger}>{children}</Collapse>;
}

const App: FC = observer(() => {
  const { localStore, userStore, navigationStore } = useRootStore();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(
    getTheme(localStore.localVariables.darkMode)
  );

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

        <Router history={navigationStore.history}>
          {/* <Sidebar open={open} /> */}
          <Header />

          <SecondHeader />
          <Switch>
            <Route path="/" exact component={LandingPage} />

            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={SignUpPage} />
            <PrivateRoute path="/courses" exact component={Courses} />

            <PrivateRoute
              path="/courses/:CourseId"
              exact
              component={ChapterPage}
            />
            {/* <PrivateRoute
              path="/courses/:CourseId/license"
              exact
              component={LicensePage}
            /> */}
            <PrivateRoute
              path="/courses/:CourseId/:ChapterId"
              component={StepsPage}
            />
            <PrivateRoute path="/account" exact component={AccountPage} />
          </Switch>
        </Router>
      </SnackbarProvider>
    </ThemeSelector>
  );
});

export default App;
