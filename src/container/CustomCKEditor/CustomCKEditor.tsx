import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Cookies from 'universal-cookie';
import Editor from 'ckeditor5-custom-build/src/ckeditor';
import { getGeogebraStyle } from 'helpers/Geogebra';

interface IProps {
  data: string;
  onChange: Function;
}

const cookies = new Cookies();
const LightTheme = React.lazy(() => import('./lightMode'));
const DarkTheme = React.lazy(() => import('./darkMode'));

const ThemeSelector = ({ children }) => {
  const darkMode = cookies.get('darkMode') === 'true' ? true : false || false;
  return (
    <>
      <React.Suspense fallback={<></>}>
        {darkMode ? <DarkTheme /> : <LightTheme />}
      </React.Suspense>
      {children}
    </>
  );
};

const config = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'highlight',
    'numberedList',
    'bulletedList',
    'CodeBlock',
    'htmlEmbed',
    'ImageInsert',
    'mediaEmbed',
    '|',
    // "MathType",
    // "ChemType",
    'SpecialCharacters',
    'insertTable',
    '|',
    'undo',
    'redo'
  ],
  mediaEmbed: {
    extraProviders: [
      {
        name: 'falstad',
        url: /^falstad\.com\/circuit/,
        html: (match) =>
          `<p href="http://${match.input}">http://${match.input}</p>`
      },
      {
        name: 'geogebra',
        url: /^geogebra\.org/,
        html: (match) =>
          `<iframe title="${match.input}" src="http://${match.input}" height="${
            getGeogebraStyle(match.input).height
          }" width="${getGeogebraStyle(match.input).width}"/>`
      }
    ]
  },
  mathType: {
    language: 'mathjax'
  },
  link: {
    decorators: {
      toggleDownloadable: {
        mode: 'manual',
        label: 'Downloadable',
        attributes: {
          download: 'file'
        }
      },
      openInNewTab: {
        mode: 'manual',
        label: 'Open in a new tab',
        defaultValue: true, // This option will be selected by default.
        attributes: {
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      }
    }
  }
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
