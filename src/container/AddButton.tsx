import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import { useRootStore } from "context/RootStateContext";
import CreateCourse from "components/CreateCourse";
import CreateChapter from "components/CreateChapter";

interface IProps {
  add: string;
}

function AddButton(props: IProps) {
  const { userStore } = useRootStore();
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

  if (userStore.role == "admin") {
    return (
      <React.Fragment>
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: "absolute", bottom: 20, right: 20 }}
          onClick={handleOnClick}
        >
          <AddIcon />
        </Fab>
        <CreateCourse open={openCourseCreate} handleClose={handleClose} />
        <CreateChapter open={openChapterCreate} handleClose={handleClose} />
      </React.Fragment>
    );
  }
  return <React.Fragment />;
}

export default AddButton;
