import React from "react";
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import courseList from 'fakeApi/storage.json'
import MediaCard from 'container/MediaCard';


function Courses()
{
    return (
        <Paper>
            <h1>Courses</h1>
            {courseList.courses.map((course) => {
                return <MediaCard title={course.title} key={course.id} imageLink={course.metadata.picture}/>
            })}
        </Paper>
    )
}

export default Courses;