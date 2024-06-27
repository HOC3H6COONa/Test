import React from "react";
import {useNavigate} from "react-router-dom";

import classes from "./Main.module.css";

const Main = (props: any) => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/test')
    }

    return (
        <div className={classes.buttonBlock}>
            <button className={classes.button} onClick={handleNavigate}> Пройти тест</button>
        </div>
    )
}
export default Main