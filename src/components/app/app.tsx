import React, { useState, useEffect, useContext, FC } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core/styles";
import {
  Backdrop,
  CssBaseline,
  Slide,
  Collapse,
  Toolbar,
} from "@material-ui/core";
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
import { RootStoreContext } from "stores/RootStore";

const ThemeSelector = observer(({ children }) => {
  const rootStore = useContext(RootStoreContext);
  const theme = getTheme(rootStore.localStore.darkMode);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
});

function HideOnScroll({ children }: JSX.ElementChildrenAttribute) {
  const trigger = useScrollTrigger({ target: window });
  console.log(trigger);
  return <Collapse in={!trigger}>{children}</Collapse>;
}

const App: FC = observer(() => {
  const { localStore, navigationStore } = useContext(RootStoreContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStore.initLocalVariables();
  }, []);

  return (
    <ThemeSelector>
      <SnackbarProvider>
        <CssBaseline />

        <Router history={navigationStore.history}>
          <Header />

          <Toolbar variant="dense" />

          <Switch>
            <Route path="/" exact component={LandingPage} />

            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={SignUpPage} />
            <Route path="/courses" exact component={Courses} />

            <PrivateRoute
              path="/courses/:CourseId"
              exact
              component={ChapterPage}
            />
            <Route
              path="/courses/:CourseId/license"
              exact
              component={LicensePage}
            />
            <Route path="/courses/:CourseId/:ChapterId" component={StepsPage} />
            <PrivateRoute path="/account" exact component={AccountPage} />
          </Switch>
        </Router>
      </SnackbarProvider>
    </ThemeSelector>
  );
});

export default App;
