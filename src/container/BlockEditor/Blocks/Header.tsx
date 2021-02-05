import { Select, MenuItem, Input } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { RootStoreContext } from "stores/RootStore";

const HeaderTypes = ["h1", "h2", "h3", "h4", "h5"];

interface IProps {
  headerType: string;
  content: string;
}

export const HeaderToHtml = (props: IProps) => {
  const htmlString = `<${props.headerType}>${props.content}</${props.headerType}>`;
  return htmlString;
};

const Header = ({ props, id }) => {
  const { editorStore } = useContext(RootStoreContext);
  const [data, setData] = useState(props.content || "");
  const [headerType, setHeaderType] = useState(props.headerType || "");

  useEffect(() => {
    const currentProps: IProps = { content: data, headerType: headerType };
    editorStore.changeBlockProps(id, currentProps, HeaderToHtml(currentProps));
  }, [headerType, data, editorStore, id]);

  return (
    <>
      <Select
        defaultValue={props.headerType || "h1"}
        value={headerType}
        variant="outlined"
        onChange={(e) => setHeaderType(e.target.value)}
      >
        {HeaderTypes.map((item) => {
          return (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
      <Input
        fullWidth
        value={data}
        onChange={(e) => setData(e.target.value)}
      ></Input>
    </>
  );
};

export default Header;
