import { createMuiTheme } from "@material-ui/core/styles";

const getTheme = (darkMode: boolean) => {
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#006A00",
        light: "#006A00",
        dark: "#53dd6c",
      },
      secondary: {
        main: "#546A7B",
        light: "#546A7B",
        dark: "#62929E",
      },
      success: {
        main: "#53dd6c",
        light: "#53dd6c",
        dark: "#53dd6c",
      },
      text: {
        hint: darkMode ? "#53dd6c" : "#006A00",
        primary: darkMode ? "#ffffff" : "#000000",
        secondary: darkMode ? "#ffffff" : "#000000",
      },
    },
    overrides: {
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: darkMode ? "#53dd6c" : "#006A00",
        },
        colorSecondary: {
          backgroundColor: darkMode ? "#62929E" : "#546A7B",
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
      MuiTypography: {
        h2: {
          margin: "20px",
        },
      },
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
