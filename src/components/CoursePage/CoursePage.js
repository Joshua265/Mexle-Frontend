import React, {useState} from "react";
import { useLocation } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'; 

import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Typography} from '@material-ui/core';
import courseList from 'fakeApi/storage.json'
import MediaCard from 'container/MediaCard';
import FinishPage from 'components/FinishPage';


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
        width: '300%',
        minHeight: '600px',
        margin: 20,
        padding: 20
    },
    chapterProgress: {
        flexGrow: 0,
        width: '20%',
        minHeight: '600px'
    }
  }));

function CoursePage() {
    const [currentChapter, setCurrentChapter] = useState(0);
    const classes = useStyles();
    const location = useLocation();
    const course = courseList.courses.find(o => o.title === location.pathname.replace('/course/',''));

    const getActiveChapter = (chapter) => {
        setCurrentChapter(chapter);
    }

    if (currentChapter === -1) {
        return <FinishPage courseName={course.title}/>
    }
    return (
        <div className={classes.coursePage}>
            <ChapterProgress chapters={course.metadata.chapters} className={classes.chapterProgress} activeChapterCallback={getActiveChapter}/>
            <Paper className={classes.content} elevation={1}>
                <Typography variant="h6" component="h1">{course.metadata.chapters[currentChapter].title}</Typography>
                <div>{ ReactHtmlParser(course.metadata.chapters[currentChapter].html)}</div>
            </Paper>
                
        </div>
    )
}

export default CoursePage;