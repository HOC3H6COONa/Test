import React, {useEffect, useState} from 'react';
import {TestApi} from "../../MockApi/TestApi";
import TTest from './Type'
import Question from "../Question/Question";
import StepperLine from "../../UI/StepperLine";
import {useNavigate} from "react-router-dom";

import classes from './Test.module.css'

const Test = (props: any) => {
    const [test, setTest] = useState<TTest>()
    const [timeLeft, setTimeLeft] = useState(0)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const navigate = useNavigate()

    const goToNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const goToPreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    };

    useEffect(() => {
        async function fetchTestData() {
            try {
                const testData = await TestApi.getTest();
                setTest(testData);
            } catch (error) {
                console.error('Ошибка при получении данных теста:', error);
            }
        }
        fetchTestData().catch(error => {
            console.error('Необработанная ошибка:', error);
        });
        setCurrentQuestionIndex(parseInt(localStorage.getItem("questionNumber")|| "0"))
    }, [])

    useEffect(()=>{
        localStorage.setItem("questionNumber",currentQuestionIndex.toString())
    },[currentQuestionIndex])

    useEffect(() => {
        if ((test) && (test.duration !== 0)) {
            const storedStartTime = localStorage.getItem('testStartTime');
            const startTime = storedStartTime ? parseInt(storedStartTime, 10) : Date.now();
            localStorage.setItem('testStartTime', startTime.toString());

            const intervalId = setInterval(() => {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime;
                const remainingTime = test?.duration * 60000 - elapsedTime;
                setTimeLeft(remainingTime)

                if (remainingTime <= 0) {
                    clearInterval(intervalId);
                    Submit()
                }
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [test]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const Submit = () => {
        if (test) {
            const answers = test.questions.map(question => {
                const id = question.id;
                const value = localStorage.getItem(id) || 'null';
                return { id, value };
            });
            //Получение мокового результата
            const getResult = async ()=> {
                const result = await TestApi.getResult("123")
                console.log(result)
            }
            try {
                getResult().catch(error => {
                    console.error('Необработанная ошибка:', error);
                });
            } catch (error) {
                console.error('Ошибка при получении данных теста:', error);
            }
            console.log(answers);
            localStorage.clear();
            navigate('/');
        }
    }

    if (test === undefined) {
        return (
            <div>
                Loading
            </div>
        )
    } else {

        return (
            <div style={{
                display: 'flex',
                gap: '1vh',
                flexDirection: 'column',
                alignItems: 'flex-start',
                paddingLeft: '8vh',
                paddingTop: '1vh'
            }}>
                <div className={classes.titleBox}>
                    <h4 className={classes.testTitle}>{test.title}</h4>
                    {!!timeLeft &&<div className={classes.timerBox}><p className={classes.timer}>{formatTime(timeLeft)}</p></div>}
                </div>
                <StepperLine stepsNumber={test.questions.length} activeStep={currentQuestionIndex} onStepClick={(step) => setCurrentQuestionIndex(step)}/>
                <div className={classes.questionBlock}>
                    <Question question={test.questions[currentQuestionIndex]}/>
                    <div style={{display:'flex', gap:'2vh',paddingTop:'2vh'}}>
                        {currentQuestionIndex > 0 && (
                            <button className={classes.button} onClick={goToPreviousQuestion}>Назад</button>
                        )}
                        {currentQuestionIndex < test.questions.length - 1 ? (
                            <button className={classes.button} onClick={goToNextQuestion}>Далее</button>
                        ) : (
                            <button className={classes.button} onClick={Submit}>Завершить тест</button>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Test