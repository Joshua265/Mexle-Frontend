import React, { useState, useEffect } from "react";
import { Button, TextField, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomCKEditor from "container/CustomCKEditor/CustomCKEditor";

interface IProps {
  saveCallback: Function;
  id: number;
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

function CreateMultipleChoice(props: IProps) {
  const [answers, setAnswers] = useState<Array<IAnswer>>(
    props.data.answers || []
  );
  const [question, setQuestion] = useState(props.data.question || "");
  const [correctAnswer, setCorrectAnswer] = useState(
    props.data.correctAnswer || -1
  );
  const [numberAnswers, setNumberAnswers] = useState(
    props.data.answers.length || 0
  );

  const addAnswer = () => {
    setNumberAnswers(numberAnswers + 1);
    setAnswers(answers.concat({ id: numberAnswers, text: "" }));
  };

  const updateAnswer = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    id: number
  ) => {
    e.preventDefault();
    const list = answers.map((item, j) => {
      if (id === item.id) {
        return { ...item, text: e.target.value };
      } else {
        return item;
      }
    });
    setAnswers(list);
  };

  const removeAnswer = (index: number) => {
    setAnswers(answers.filter((item) => item.id !== index));
  };

  useEffect(() => {
    props.saveCallback(props.id, { question, answers, correctAnswer });
  }, [answers, question, correctAnswer, numberAnswers]);

  return (
    <React.Fragment>
      <CustomCKEditor
        data={question}
        onChange={(data: any) => setQuestion(data)}
      />
      <List>
        <Button onClick={addAnswer}>Antwort hinzufügen</Button>
        {answers.length > 0 ? (
          answers.map((ans, index) => {
            return (
              <ListItem key={ans.id}>
                <TextField
                  label={`Antwort ${index}`}
                  value={ans.text}
                  onChange={(e) => updateAnswer(e, ans.id)}
                />
                <Button onClick={() => setCorrectAnswer(ans.id)}>
                  Als richtige Antwort auswählen
                </Button>
                <Button onClick={() => removeAnswer(ans.id)}>Löschen</Button>
              </ListItem>
            );
          })
        ) : (
          <React.Fragment />
        )}
      </List>
    </React.Fragment>
  );
}

export default CreateMultipleChoice;
