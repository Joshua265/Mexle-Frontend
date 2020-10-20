import React from "react";
import { useLocation } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import courseList from 'fakeApi/storage.json'
import MediaCard from 'container/MediaCard';

import ChapterProgress from 'components/ChapterProgress';

const useStyles = makeStyles((theme) => ({
    coursePage: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 0
    },
    content: {
        flexGrow: 4,
        width: '300%'
    },
    chapterProgress: {
        flexGrow: 0,
        width: '20%'
    }
  }));

function CoursePage() {
    const classes = useStyles();
    const location = useLocation();
    const course = courseList.courses.find(o => o.title === location.pathname.replace('/course/',''));


    return (
        <div className={classes.coursePage}>
            <ChapterProgress chapters={course.metadata.chapters} className={classes.chapterProgress}/>
            <div className={classes.content}>
                <h1>{course.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: course.metadata.chapters[0].content }}/>
            </div>
        </div>
    )
}

export default CoursePage;