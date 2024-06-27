import React, {useEffect, useState} from "react";
import {LongAnswerQuestion} from '../types';

import classes from "./../Question.module.css";

type QuestionProps = {
    question: LongAnswerQuestion;
};

const LongAnswerComponent: React.FC<QuestionProps> = ({ question }) => {
    const [longAnswer, setLongAnswer] = useState<string | null>(null);
    const handleAnswerChange = (answer:string) =>{
        setLongAnswer(answer);
        localStorage.setItem(question.id,answer);
    }

    useEffect(() => {
        const savedAnswer = localStorage.getItem(question.id);
        if (savedAnswer) {
            setLongAnswer(savedAnswer);
        }
    }, [question.id]);


    return(
        <div className={classes.question}>
            <p className={classes.title}>{question.question}</p>
            <textarea
                name="inputAnswer"
                value={longAnswer || ''}
                autoComplete={"off"}
                onChange={(event) => handleAnswerChange(event.target.value)}
                className={classes.longTextInput}
            />
        </div>
    )
}

export default LongAnswerComponent