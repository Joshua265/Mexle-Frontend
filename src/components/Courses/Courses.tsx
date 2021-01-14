import React, { useEffect, useState, useContext } from "react";
import {
  Paper,
  Divider,
  Typography,
  Box,
  Backdrop,
  Grid,
  Container,
  TextField,
  Switch,
  FormControlLabel,
  MenuItem,
  InputBase,
  IconButton,
  Collapse,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import { RootStoreContext } from "stores/RootStore";

import MediaCard from "container/MediaCard";
import AddButton from "container/AddButton";
import webServiceProvider from "helpers/webServiceProvider";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import languages from "helpers/languages";
import { useSnackbar } from "notistack";
import { ICourse } from "types";

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T & { search: { value: string } };
  // probably you might want to add the currentTarget as well
  // currentTarget: T;
};

const useStyles = makeStyles((theme: Theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  header: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0, 4),
  },
  searchField: {
    padding: "2px 4px",
    display: "flex",
    margin: 20,
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

function Courses() {
  const history = useHistory();
  const classes = useStyles();
  const { userStore } = useContext(RootStoreContext);
  const { t, i18n } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [error, setError] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [languageFilter, setLanguageFilter] = useState(
    userStore.userData.language || i18n.language || "de-DE"
  );

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const courseList = await webServiceProvider.get("courses");
      console.log(courseList);
      if (courseList === "Forbidden") {
        history.push("/login");
      }
      setCourses(courseList.courses);
    } catch {
      setError(true);
    }
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    try {
      const courses = await webServiceProvider.get("courses/filter", {
        search: e.target.search.value,
        language: languageFilter,
      });
      setCourses(courses);
    } catch (e) {
      console.log(e);
      enqueueSnackbar(t("couldNotApplyFilter"), { variant: "error" });
    }
  };

  if (courses) {
    return (
      <React.Fragment>
        <div className={classes.header}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {t("courses")}
            </Typography>
            <Paper
              component="form"
              elevation={2}
              className={classes.searchField}
              onSubmit={handleSearch}
            >
              <IconButton
                className={classes.iconButton}
                aria-label="filters"
                onClick={() => setOpenFilter(!openFilter)}
              >
                <FilterListIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder={t("search")}
                type="search"
                id="search"
                inputProps={{ "aria-label": "search courses" }}
              />
              <IconButton type="submit" className={classes.iconButton}>
                <SearchIcon />
              </IconButton>
            </Paper>
            <Collapse in={openFilter}>
              <Grid container justify="center" alignItems="center" spacing={4}>
                <Grid item md={4}>
                  <TextField
                    select
                    fullWidth
                    label={t("language")}
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                  >
                    {languages.map((lng) => {
                      return (
                        <MenuItem value={lng.value} key={lng.value}>
                          {lng.label}
                        </MenuItem>
                      );
                    })}
                    <MenuItem value="all" key="all">
                      {t("all")}
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item md={4}>
                  <FormControlLabel
                    defaultChecked={true}
                    control={<Switch name="showFinished" />}
                    label={t("showFinishedCourses")}
                  />
                </Grid>
              </Grid>
            </Collapse>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {courses.map((course, index) => {
              return (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <MediaCard
                    _id={course._id}
                    title={course.title}
                    key={course._id}
                    description={course.description}
                    imageLink={course.picture}
                    author={course.author}
                    language={course.language}
                    license={course.license}
                    link={`/courses/${course._id}`}
                    kind="Course"
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
        <AddButton add="course" />
      </React.Fragment>
    );
  }
  if (error) {
    return <p>Error</p>;
  }
  return <Backdrop open />;
}

export default Courses;
