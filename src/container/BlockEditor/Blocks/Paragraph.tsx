import CustomCKEditor from "container/CustomCKEditor/CustomCKEditor";
import React, { useState, useEffect, useContext } from "react";
import { RootStoreContext } from "stores/RootStore";

interface IProps {
  content?: string;
}

export const toHtml = (props: IProps) => {
  const htmlString = `<p>${props.content}</p>`;
  return htmlString;
};

const Paragraph = ({ props, id }) => {
  const { editorStore } = useContext(RootStoreContext);
  const [data, setData] = useState(props.content || "");

  useEffect(() => {
    const currentProps: IProps = { content: data };
    editorStore.changeBlockProps(id, currentProps, toHtml(currentProps));
  }, [data]);

  return (
    <CustomCKEditor data={data} onChange={(data: string) => setData(data)} />
  );
};

export default Paragraph;
