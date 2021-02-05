import React, { useEffect, useState, useContext } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";

import {
  Card,
  CardActionArea,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import { Header, Paragraph, Image, MathInput, Video, Html } from "./Blocks";
import { RootStoreContext } from "stores/RootStore";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

const componentList = {
  paragraph: Paragraph,
  header: Header,
  image: Image,
  mathinput: MathInput,
  video: Video,
  html: Html,
};

const AddItemDialog = ({ open, handleClose }) => {
  const { t } = useTranslation();
  return (
    <Dialog
      onClose={() => handleClose()}
      aria-labelledby="add-item-dialog"
      open={open}
    >
      <DialogTitle id="add-item-dialog-title">Add Item</DialogTitle>
      <List>
        {Object.keys(componentList).map((item) => {
          return (
            <ListItem button onClick={() => handleClose(item)}>
              <ListItemText primary={t(String(item))} />
            </ListItem>
          );
        })}
      </List>
    </Dialog>
  );
};

const DragHandle = SortableHandle(({ style }) => (
  <DragHandleIcon
    style={{ fontSize: 48, cursor: "move", width: 64, margin: 12, ...style }}
  ></DragHandleIcon>
));

const SortableItem = SortableElement(({ type, props, id }) => {
  const { editorStore } = useContext(RootStoreContext);
  const { t } = useTranslation();
  const Component = componentList[type];

  return (
    <Card style={{ display: "flex", margin: 8 }} variant="outlined">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <DragHandle style={{}} />
        <IconButton onClick={() => editorStore.removeItem(id)}>
          <DeleteOutlineIcon color="error" />
        </IconButton>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Typography variant="h5" component="h5" color="secondary">
          {t(type)}
        </Typography>
        <Component props={props} id={id} />
      </div>
    </Card>
  );
});

const CustomSortableContainer = SortableContainer(({ children }) => {
  return <div>{children}</div>;
});

interface IProps {
  html?: string;
}

const BlockEditor = observer((props: IProps) => {
  const { editorStore } = useContext(RootStoreContext);
  const [openAddItemDialog, setOpenAddItemDialog] = useState(false);

  useEffect(() => {
    if (props.html) {
      editorStore.getBlocksFromHTML(props.html);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.html, editorStore]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    editorStore.changeOrder(oldIndex, newIndex);
  };

  const addItem = (item?: string) => {
    editorStore.addItem(item);
    setOpenAddItemDialog(false);
  };

  return (
    <>
      <CustomSortableContainer onSortEnd={onSortEnd} useDragHandle lockAxis="y">
        {editorStore.blocks.map((value, index) => (
          <SortableItem
            key={value.key}
            index={index}
            type={value.type}
            props={value.props}
            id={value.key}
          />
        ))}
      </CustomSortableContainer>
      <Card
        style={{
          margin: 8,
        }}
        variant="outlined"
        onClick={() => setOpenAddItemDialog(true)}
      >
        <CardActionArea
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddIcon style={{ fontSize: "42px", margin: 8 }} />
        </CardActionArea>
      </Card>
      <AddItemDialog
        open={openAddItemDialog}
        handleClose={(itemType: string) => addItem(itemType)}
      />
    </>
  );
});

export default BlockEditor;
