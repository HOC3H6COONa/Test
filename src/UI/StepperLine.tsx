import React from 'react';
import classes from './StepperLine.module.css';

type QuestionProps = {
    stepsNumber: number;
    activeStep: number;
    onStepClick: (step: number) => void;
}

const StepperLine: React.FC<QuestionProps> = ({ stepsNumber, activeStep, onStepClick }) => {
    const steps = Array.from({ length: stepsNumber }, (_, index) => (
        <div
            key={index}
            className={`${classes.step} ${index === activeStep ? classes.active : ''}`}
            style={{ width: `calc(80% / ${stepsNumber})` }}
            onClick={() => onStepClick(index)}
        ></div>
    ));

    return (
        <div className={classes.stepperLine}>
            {steps}
        </div>
    );
}

export default StepperLine;