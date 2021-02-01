import { createMuiTheme } from "@material-ui/core/styles";

const darkGreen = "#006A00";
const darkBlue = "#546A7B";

const lightGreen = "#53DD6C";
const lightBlue = "#A0DDFF";

const white = "#ffffff";
const black = "#000000";

const textDisabledDarkMode = "rgba(255, 255, 255, 0.5)";
const textDisabledLightMode = "rgba(0, 0, 0, 0.38)";

const getTheme = (darkMode: boolean) => {
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? lightGreen : darkGreen,
        light: darkGreen,
        dark: lightGreen,
      },
      secondary: {
        main: darkMode ? lightBlue : darkBlue,
        light: darkBlue,
        dark: lightBlue,
      },
      success: {
        main: lightGreen,
        light: lightGreen,
        dark: lightGreen,
      },
      text: {
        hint: darkMode ? lightGreen : darkGreen,
        primary: darkMode ? white : black,
        secondary: darkMode ? black : white,
      },
    },
    overrides: {
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: darkMode ? lightGreen : darkGreen,
        },
        colorSecondary: {
          backgroundColor: darkMode ? lightBlue : darkBlue,
        },
      },
      MuiPaper: {
        elevation1: {
          margin: "20px",
          padding: "20px",
          boxSizing: "border-box",
          overflowY: "auto",
          overflowX: "hidden",
        },
        elevation2: {
          height: "46px",
          marginLeft: "20px",
          marginRight: "20px",
        },
      },
      MuiBreadcrumbs: {
        separator: {
          color: darkMode ? black : white,
        },
      },
      MuiStepLabel: {
        label: {
          color: darkMode ? textDisabledDarkMode : textDisabledLightMode,
        },
      },
      MuiFormLabel: { root: { color: darkMode ? white : black } },
    },
    zIndex: {
      mobileStepper: 1000,
      drawer: 1050,
      speedDial: 1050,
      appBar: 1100,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },
  });
  return theme;
};

export default getTheme;
