import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import courseList from "fakeApi/courses.json";
import MediaCard from "container/MediaCard";

function Courses() {
  return (
    <Paper>
      <h1>Courses</h1>
      {courseList.map((course) => {
        return (
          <MediaCard
            title={course.title}
            key={course.id}
            imageLink={course.picture}
            link={course.id}
          />
        );
      })}
    </Paper>
  );
}

export default Courses;
