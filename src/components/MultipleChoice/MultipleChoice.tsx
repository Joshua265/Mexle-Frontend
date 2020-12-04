import React, { useState } from "react";
import { Button, List, ListItem } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
// import transform from "helpers/transform";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  data: IMultipleChoice;
}

interface IMultipleChoice {
  question: string;
  answers: Array<IAnswer>;
  correctAnswer: number;
}

interface IAnswer {
  id: number;
  text: string;
}

const useStyles = makeStyles((theme) => ({
  green: {
    color: "#35D435",
  },
  red: {
    color: "red",
  },
  default: {},
}));

function MultipleChoice(props: IProps) {
  const classes = useStyles();
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<number>(-1);

  console.log(props.data);

  if (showAnswer) {
    return (
      <React.Fragment>
        <div>
          {/* {ReactHtmlParser(props.data.question, { transform: transform })} */}
        </div>
        <List>
          {props.data.answers.length > 0 ? (
            props.data.answers.map((ans) => {
              return (
                <ListItem>
                  <Button
                    key={ans.id}
                    variant="outlined"
                    className={
                      ans.id === props.data.correctAnswer
                        ? classes.green
                        : ans.id === currentAnswer
                        ? classes.red
                        : classes.default
                    }
                  >
                    {ans.text}
                  </Button>
                </ListItem>
              );
            })
          ) : (
            <React.Fragment />
          )}
        </List>
        <Button onClick={() => setShowAnswer(false)}>Zurücksetzen</Button>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div>
        {/* {ReactHtmlParser(props.data.question, { transform: transform })} */}
      </div>
      <List>
        {props.data.answers.map((ans) => {
          return (
            <ListItem>
              <Button
                variant="outlined"
                key={ans.id}
                value={ans.id}
                onClick={() => setCurrentAnswer(ans.id)}
              >
                {ans.text}
              </Button>
            </ListItem>
          );
        })}
      </List>
      <Button onClick={() => setShowAnswer(true)}>Antwort Anzeigen</Button>
    </React.Fragment>
  );
}

export default MultipleChoice;
