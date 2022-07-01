import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRecomandationIds } from "../pure/getRecomandationIds";

function Result({ result }) {
    let dataResult = result;
    const [, setRecomandationIds] = useState('');

    if (!Object.keys(result).length) {
        dataResult = JSON.parse(localStorage.getItem('dataResult'))
    }

    useEffect(() => {
        setRecomandationIds(getRecomandationIds(dataResult));
    }, [dataResult]);


    return (
        <div className='react-quiz container'>
            <h1 className='react-quiz-heading'>Вы ответили на все вопросы!</h1>
            <p className='react-quiz-text'>Пройти опрос еще раз?</p>
            <br />
            <Link to='/quiz'><button className='react-quiz-btn'>К тесту</button></Link>
        </div>
    );
}

export default Result;