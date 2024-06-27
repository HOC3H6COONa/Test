import React, {useEffect, useState} from "react";
import {MultipleChoiceQuestion} from '../types';
import classes from "../Question.module.css";

type QuestionProps = {
    question: MultipleChoiceQuestion;
};

const MultipleChoiceComponent: React.FC<QuestionProps> = ({question}) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleOptionChange = (option: string) => {
        setSelectedOptions((prevSelectedOptions: string[]) =>
            prevSelectedOptions.includes(option)
                ? prevSelectedOptions.filter((prevOption: string) => prevOption !== option)
                : [...prevSelectedOptions, option]
        );
    };

    useEffect(() => {
        const savedOptions = localStorage.getItem(question.id);
        if (savedOptions) {
            setSelectedOptions(JSON.parse(savedOptions));
        }
    }, [question.id]);

    useEffect(() => {
        localStorage.setItem(question.id, JSON.stringify(selectedOptions));
    }, [selectedOptions, question.id]);

    return (
        <div className={classes.question}>
            <p className={classes.title}>{question.question}</p>
            {question.options.map((option, index) => (
                <div key={index} className={classes.item}>
                    <input
                        type="checkbox"
                        name="option"
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleOptionChange(option)}
                    />
                    <p className={classes.option}> {option}</p>
                </div>
            ))}
        </div>
    );
};

export default MultipleChoiceComponent;