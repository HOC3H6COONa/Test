import {
    LongAnswerQuestion,
    MultipleChoiceQuestion,
    ShortAnswerQuestion,
    SingleChoiceQuestion
} from "../Question/types";

type TTest = {
    title: string; // Название теста
    duration: number; // Время на выполнение теста в минутах
    questions: (SingleChoiceQuestion | MultipleChoiceQuestion | ShortAnswerQuestion | LongAnswerQuestion)[]; // Массив вопросов
};

export default TTest