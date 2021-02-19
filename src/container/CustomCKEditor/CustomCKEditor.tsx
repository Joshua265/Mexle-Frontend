import React, { useContext } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Cookies from "universal-cookie";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { getGeogebraStyle } from "helpers/Geogebra";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "stores/RootStore";

interface IProps {
  data: string;
  onChange(data: string): void;
}

const cookies = new Cookies();
const LightTheme = React.lazy(() => import("./lightMode"));
const DarkTheme = React.lazy(() => import("./darkMode"));

const ThemeSelector = observer(({ children }) => {
  const { localStore } = useContext(RootStoreContext);
  return (
    <>
      <React.Suspense fallback={<></>}>
        {localStore.darkMode ? <DarkTheme /> : <LightTheme />}
      </React.Suspense>
      {children}
    </>
  );
});

function CustomCKEditor(props: IProps) {
  const { t, i18n } = useTranslation();

  const config = {
    toolbar: [
      "undo",
      "redo",
      "|",
      "bold",
      "italic",
      "link",
      "anchor",
      "hide",
      "bulletedList",
      "numberedList",
      "|",
      "highlight",
      "fontColor",
      "fontFamily",
      "fontSize",
      "|",
      "indent",
      "outdent",
      "|",
    ],
    removePlugins: [
      "Base64UploadAdapter",
      "BlockQuote",
      "CodeBlock",

      "Heading",

      "Image",
      "ImageCaption",
      "ImageInsert",
      "ImageResize",
      "ImageStyle",
      "ImageToolbar",
      "ImageUpload",
      "MathType",
      "Media",
      "MediaCaption",
      "MediaStyle",
      "MediaToolbar",
      "MediaTextAlternative",
      "SlideShow",
      "Table",
      "TableCellProperties",
      "TableProperties",
      "TableToolbar",
      "TextTransformation",
      "Underline",
    ],
    mediaEmbed: {
      extraProviders: [
        {
          name: "falstad",
          url: /^falstad\.com\/circuit/,
          html: (match) =>
            `<p href="http://${match.input}">http://${match.input}</p>`,
        },
        {
          name: "geogebra",
          url: /^geogebra\.org/,
          html: (match) =>
            `<iframe title="${match.input}" src="http://${match.input}" height="400px" width="100%"/>`,
        },
      ],
    },
    mathType: {
      language: i18n.language.substring(0, 2),
    },
    hide: {
      icon: "../../images/Hide.svg",
    },
    language: i18n.language.substring(0, 2),
  };

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
