import React, { useEffect, useState } from "react";
import { Paper, Divider, Typography, Box, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import courseList from "fakeApi/courses.json";
import MediaCard from "container/MediaCard";
import AddButton from "container/AddButton";
import webServiceProvider from "helpers/webServiceProvider";

import { API_SERVER } from "utils/config";

interface ICourse {
  _id: string;
  title: string;
  description: string;
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

  console.log(API_SERVER);

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
              link={`/courses/${course._id}`}
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
