import React from "react";
import { Paper, Divider, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import courseList from "fakeApi/courses.json";
import MediaCard from "container/MediaCard";
import AddButton from "container/AddButton";

interface ICourse {
  courseId: string;
  title: string;
  description: string;
  picture: string;
}

function Courses() {
  return (
    <React.Fragment>
      <Typography variant="h2" component="h3">
        Kurse
      </Typography>
      {courseList.map((course) => {
        return (
          <MediaCard
            title={course.title}
            key={course.courseId}
            imageLink={course.picture}
            link={`/course/${course.courseId}`}
          />
        );
      })}
      <AddButton add="course" />
    </React.Fragment>
  );
}

export default Courses;
