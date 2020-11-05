import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import courseList from "fakeApi/courses.json";
import MediaCard from "container/MediaCard";

interface ICourse {
  courseId: string,
  title: string,
  description: string,
  picture: string,
}

function Courses() {
  return (
    <Paper>
      <h1>Courses</h1>
      {courseList.map((course) => {
        return (
          <MediaCard
            title={course.title}
            key={course.courseId}
            imageLink={course.picture}
            link={course.courseId}
          />
        );
      })}
    </Paper>
  );
}

export default Courses;
