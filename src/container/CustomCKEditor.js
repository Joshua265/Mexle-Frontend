import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import MyCustomUploadAdapterPlugin from "utils/MyCustomUploadAdapterPlugin";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

// interface IProps {
//   data: string;
//   onChange: Function;
// }

function CustomCKEditor(props) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={props.data}
      config={{
        toolbar: [
          // "heading",
          // "|",
          // "bold",
          // "italic",
          // "link",
          // "numberedList",
          // "bulletedList",
          "CodeBlock",
          // "imageUpload",
          // "mediaEmbed",
          // "|",
          // "insertTable",
          // "tableColumn",
          // "tableRow",
          // "mergeTableCells",
          // "|",
          // "undo",
          // "redo",
        ],
        extraPlugins: [
          // MyCustomUploadAdapterPlugin,
          CodeBlock,
          Essentials,
          Paragraph,
          // Bold,
          // Italic,
        ],
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        props.onChange(data);
      }}
    />
  );
}

export default CustomCKEditor;
