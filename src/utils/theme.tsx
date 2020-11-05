


// const colors =  
// {
//         backgroundColor: "#313842",
//         textColor: "white",
//         focusColor: "#00b8ff",
//         errorColor: "red",
//         windowColor: '#7D8590'
// }

// const theme = createMuiTheme({
//   overrides: {
//     // Paper
//     MuiPaper: {
//       root: {
//         backgroundColor: colors.backgroundColor,
//         position: "absolute",
//         width: "100%",
//         height: "100%", 
//       },
//       outlined: {
//         backgroundColor: 'grey',
//         position: "relative",
//         width: "auto",
//         height: "auto",
//         padding: "20px"
//       },
//     },
//     //TextField
//     MuiInput: {
//       input: {
//         color: colors.textColor
//       },
//       root: {
//         color: colors.textColor
//       },
//       floatingLabelFocusStyle: {
//         color: colors.textColor
//       },
//       label: {
//         "&$focusedLabel": {
//           color: colors.focusColor
//         },
//         "&$erroredLabel": {
//           color: colors.errorColor
//         }
//       },
//       Label: {},
//       focusedLabel: {},
//       erroredLabel: {},
//       underline: {
//         "&$error:after": {
//           borderBottomColor: colors.errorColor
//         },
//         "&:after": {
//           borderBottomColor: colors.focusColor
//         },
//         "&:before": {
//           borderBottomColor: colors.textColor
//         }
//       },
//       error: {}
//     },
//     //
//   },
// });
import React from "react";

import { createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');;


const theme = React.useMemo(
  () =>
    createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
      },
    }),
  [prefersDarkMode],
);


export default theme;
