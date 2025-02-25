export interface QuestionBase {
    id: string;
    question: string;
}

export interface SingleChoiceQuestion extends QuestionBase {
    type: 'single-choice';
    options: string[];
}

export interface MultipleChoiceQuestion extends QuestionBase {
    type: 'multiple-choice';
    options: string[];
}

export interface ShortAnswerQuestion extends QuestionBase {
    type: 'short-answer';
}

export interface LongAnswerQuestion extends QuestionBase {
    type: 'long-answer';
}