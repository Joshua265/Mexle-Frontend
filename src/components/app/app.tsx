import React, { useEffect, useContext, FC } from "react";
import { Router, Switch, Route } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Toolbar } from "@material-ui/core";

import { SnackbarProvider } from "notistack";
import { observer } from "mobx-react-lite";

import PrivateRoute from "PrivateRoute";

import Header from "components/header";

import Courses from "components/Courses";
import LoginPage from "components/Login";
import AccountPage from "components/AccountPage";
import StepsPage from "components/StepsPage";
import ChapterPage from "components/ChapterPage";
import SignUpPage from "components/SignUpPage";

import getTheme from "helpers/theme";
import LicensePage from "components/LicensePage";
import LandingPage from "components/LandingPage/LandingPage";
import { RootStoreContext } from "stores/RootStore";

const ThemeSelector = observer(({ children }) => {
  const rootStore = useContext(RootStoreContext);
  const theme = getTheme(rootStore.localStore.darkMode);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
});

const App: FC = observer(() => {
  const { localStore, navigationStore, userStore } = useContext(
    RootStoreContext
  );

  useEffect(() => {
    localStore.initLocalVariables();
    userStore.verifyToken();
  }, [localStore, userStore]);

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

            <Route path="/courses/:CourseId" exact component={ChapterPage} />
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
