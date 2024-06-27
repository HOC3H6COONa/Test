import React, {useEffect, useState} from "react";
import {SingleChoiceQuestion} from '../types';
import classes from "../Question.module.css";

type QuestionProps = {
   question: SingleChoiceQuestion
}

const SingleChoiceComponent: React.FC<QuestionProps> = ({ question }) => {
   const [selectedOption, setSelectedOption] = useState<string | null>(null);

   const handleOptionChange = (option: string) => {
      setSelectedOption(option);
      localStorage.setItem(question.id, option);
   };

    useEffect(() => {
        const savedOption = localStorage.getItem(question.id);
        if (savedOption) {
            setSelectedOption(savedOption);
        }
    }, [question.id]);

   return (
       <div className={classes.question}>
          <p className={classes.title}> {question.question} </p>
          {question.options.map((option, index) => (
              <div key={index} className={classes.item}>
                    <input
                        type="radio"
                        name="option"
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => handleOptionChange(option)}
                        className={classes.customRadio}
                    />
                  <p className={classes.option}> {option}</p>
              </div>
          ))}
       </div>
   );
}

export default SingleChoiceComponent