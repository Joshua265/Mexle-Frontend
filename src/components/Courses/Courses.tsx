import React, { useEffect, useState } from "react";
import { Paper, Divider, Typography, Box, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MediaCard from "container/MediaCard";
import AddButton from "container/AddButton";
import webServiceProvider from "helpers/webServiceProvider";

interface ICourse {
  _id: string;
  title: string;
  description: string;
  author: string;
  visible: boolean;
  picture: string;
}

function Courses() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const courseList = await webServiceProvider.get("courses");
      setCourses(courseList.courses);
    } catch {
      setError(true);
    }
  };

  if (courses) {
    return (
      <React.Fragment>
        <Typography variant="h2" component="h3">
          Kurse
        </Typography>
        {courses.map((course) => {
          return (
            <MediaCard
              title={course.title}
              key={course._id}
              imageLink={course.picture}
              author={course.author}
              link={`/courses/${course._id}`}
              kind="Course"
            />
          );
        })}
        <AddButton add="course" />
      </React.Fragment>
    );
  }
  if (error) {
    return <p>Error</p>;
  }
  return <Backdrop open />;
}

export default Courses;
