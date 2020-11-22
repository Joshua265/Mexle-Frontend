import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Cookies from "universal-cookie";
import Editor from "ckeditor/build/ckeditor";

interface IProps {
  data: string;
  onChange: Function;
}

const cookies = new Cookies();
const LightTheme = React.lazy(() => import("./lightMode"));
const DarkTheme = React.lazy(() => import("./darkMode"));

const ThemeSelector = ({ children }) => {
  const darkMode = cookies.get("darkMode") === "true" ? true : false || false;
  return (
    <>
      <React.Suspense fallback={<></>}>
        {darkMode ? <DarkTheme /> : <LightTheme />}
      </React.Suspense>
      {children}
    </>
  );
};

const API_SERVER = "http://localhost:3001/";

const config = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "highlight",
    "numberedList",
    "bulletedList",
    "CodeBlock",
    "ImageInsert",
    "mediaEmbed",
    "|",
    "MathType",
    "ChemType",
    "SpecialCharacters",
    "insertTable",
    "|",
    "undo",
    "redo",
  ],
  mediaEmbed: {
    extraProviders: [
      {
        name: "falstad",
        url: /^falstad\.com\/circuit/,
        html: (match) =>
          `<p href="http://${match.input}">http://${match.input}</p>`,
      },
    ],
  },
  mathType: {
    language: "mathjax",
  },
};

function CustomCKEditor(props: IProps) {
  return (
    <ThemeSelector>
      <CKEditor
        editor={Editor}
        data={props.data}
        config={config}
        onChange={(event, editor) => {
          const data = editor.getData();
          props.onChange(data);
        }}
      />
    </ThemeSelector>
  );
}

export default CustomCKEditor;
