import React from "react";
import {LongAnswerQuestion, MultipleChoiceQuestion, ShortAnswerQuestion, SingleChoiceQuestion} from "./types";
import SingleChoiceComponent from "./QuestionForms/SingleChoiceComponent";
import ShortAnswerComponent from "./QuestionForms/ShortAnswerComponent";
import MultipleChoiceComponent from "./QuestionForms/MultipleChoiceComponent";
import LongAnswerComponent from "./QuestionForms/LongAnswerComponent";

type QuestionsProps = {
    question: SingleChoiceQuestion | MultipleChoiceQuestion | ShortAnswerQuestion | LongAnswerQuestion;
};

const Question: React.FC<QuestionsProps> = ({ question }) => {
    switch (question.type) {
        case 'single-choice':
            return <SingleChoiceComponent question={question}/>;
        case 'multiple-choice':
            return <MultipleChoiceComponent question={question}/>;
        case 'short-answer':
            return <ShortAnswerComponent question={question}/>;
        case 'long-answer':
            return <LongAnswerComponent question={question}/>;
        default:
            return null;
    }
}

export default Question;