import { Input } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { RootStoreContext } from "stores/RootStore";

interface IProps {
  html: string;
}

export const toHtml = (props: IProps) => {
  const htmlString = `<p>${props.html}</p>`;
  return htmlString;
};

const Html = ({ props, id }) => {
  const { editorStore } = useContext(RootStoreContext);
  console.log(props.html);
  const [html, setHtml] = useState(props.html || "");

  useEffect(() => {
    const currentProps: IProps = { html: html };
    editorStore.changeBlockProps(id, currentProps, toHtml(currentProps));
  }, [html, editorStore, id]);

  return (
    <>
      <Input
        fullWidth
        value={html}
        onChange={(e) => setHtml(e.target.value)}
      ></Input>
    </>
  );
};

export default Html;
