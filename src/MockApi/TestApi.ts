import TTest from "../Components/Test/Type";

//Имитация получения данных теста и отправки ответов
export const TestApi = {
    getTest(): TTest{
        return ({
            title: 'Тестирование',
            duration: 15,
            questions: [
                {
                    id: '1',
                    question: 'Что такое TypeScript?',
                    type: 'single-choice',
                    options: ['Язык программирования', 'Библиотека', 'Фреймворк', 'Транспилятор']
                },
                {
                    id: '2',
                    question: 'Какие преимущества даёт использование TypeScript?',
                    type: 'multiple-choice',
                    options: ['Статическая типизация', 'Улучшенная поддержка в IDE', 'Совместимость с JavaScript', 'Ускорение выполнения кода']
                },
                {
                    id: '3',
                    question: 'Ваше Имя',
                    type: 'short-answer'
                },
                {
                    id: '4',
                    question: 'Расскажите о себе',
                    type: 'long-answer'
                }
            ]
        })
    },
    getResult(answers:string):string {
        return (
            "Test Result"
        )
    }
}