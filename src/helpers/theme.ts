import { createMuiTheme } from "@material-ui/core/styles";

const getTheme = (darkMode: boolean) => {
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
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
    zIndex: {
      drawer: 1050,
    },
  });
  return theme;
};

export default getTheme;
