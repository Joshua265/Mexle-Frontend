import React, { useContext, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import CreateCourse from "components/CreateCourse";
import CreateChapter from "components/CreateChapter";
import CreateStep from "components/CreateStep";
import checkForEditShow from "helpers/checkForEditShow";
import { RootStoreContext } from "stores/RootStore";
import { observer } from "mobx-react-lite";

interface IProps {
  add: string;
}

const AddButton = observer((props: IProps) => {
  const { userStore } = useContext(RootStoreContext);
  const [openCourseCreate, setOpenCourseCreate] = useState(false);
  const [openChapterCreate, setOpenChapterCreate] = useState(false);
  const [openStepCreate, setOpenStepCreate] = useState(false);

  const handleOnClick = () => {
    if (props.add === "course") {
      setOpenCourseCreate(true);
    }
    if (props.add === "chapter") {
      setOpenChapterCreate(true);
    }
    if (props.add === "step") {
      setOpenStepCreate(true);
    }
  };

  const handleClose = () => {
    if (props.add === "course") {
      setOpenCourseCreate(false);
    }
    if (props.add === "chapter") {
      setOpenChapterCreate(false);
    }
    if (props.add === "step") {
      setOpenStepCreate(false);
    }
  };

  if (checkForEditShow(userStore.userData)) {
    return (
      <React.Fragment>
        <Fab
          color="secondary"
          aria-label="add"
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
          }}
          onClick={handleOnClick}
        >
          <AddIcon />
        </Fab>
        <CreateCourse
          edit={false}
          open={openCourseCreate}
          handleClose={handleClose}
        />
        <CreateChapter
          edit={false}
          open={openChapterCreate}
          handleClose={handleClose}
        />
        <CreateStep open={openStepCreate} handleClose={handleClose} />
      </React.Fragment>
    );
  }
  return <React.Fragment />;
});

export default AddButton;
