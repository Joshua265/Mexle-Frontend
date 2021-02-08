import React, {
  useState,
  useEffect,
  useContext,
  FunctionComponent,
} from "react";
import { RootStoreContext } from "stores/RootStore";
import { toTex } from "algebra.js";
import { Node, Context } from "react-mathjax";
import { Input } from "@material-ui/core";

interface IProps {
  content?: string;
}

export const toHtml = (props: IProps): string => {
  const htmlString = `<latex>${props.content}</latex>`;
  return htmlString;
};

const MathInput: FunctionComponent<any> = ({ props, id }) => {
  const { editorStore } = useContext(RootStoreContext);
  const [data, setData] = useState(
    props.content || "\\frac{1}{\\sqrt{2}}\\cdot 2"
  );

  useEffect(() => {
    const currentProps: IProps = { content: data };
    editorStore.changeBlockProps(id, currentProps, toHtml(currentProps));
  }, [data, editorStore, id]);

  return (
    <>
      <Input
        value={data}
        onChange={(e) => setData(toTex(e.target.value))}
      ></Input>
      <Context input="ascii">
        <Node>{data}</Node>
      </Context>
    </>
  );
};

export default MathInput;
