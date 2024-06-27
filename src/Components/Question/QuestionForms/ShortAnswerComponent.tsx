import React, {useEffect, useState} from "react";
import {ShortAnswerQuestion} from '../types';
import classes from "../Question.module.css";

type QuestionProps = {
    question: ShortAnswerQuestion;
};

const ShortAnswerComponent: React.FC<QuestionProps> = ({ question }) => {
    const [answer, setAnswer] = useState<string | null>(null);
    const handleAnswerChange = (answer:string) =>{
        setAnswer(answer);
        localStorage.setItem(question.id,answer);
    }

    useEffect(() => {
        const savedAnswer = localStorage.getItem(question.id);
        if (savedAnswer) {
            setAnswer(savedAnswer);
        }
    }, [question.id]);

    return(
        <div className={classes.question}>
            <p className={classes.title}> {question.question} </p>
            <input
                type="text"
                name="inputAnswer"
                value={answer || ''}
                autoComplete={"off"}
                onChange={(event) => handleAnswerChange(event.target.value)}
                className={classes.textInput}
            />
        </div>
    )
}

export default ShortAnswerComponent