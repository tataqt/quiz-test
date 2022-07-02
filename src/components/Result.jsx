import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRecomandationIds } from "../pure/getRecomandationIds";

function Result({ result }) {
    const [recomandationIds, setRecomandationIds] = useState('');
    const [dataResult, setDataResult] = useState({});

    useEffect(() => {
        if (!Object.keys(result).length) {
            setDataResult(JSON.parse(localStorage.getItem('dataResult')));
        } else {
            setDataResult(result);
        }
    }, [result]);

    useEffect(() => {
        if (Object.keys(dataResult).length) {
            setRecomandationIds(getRecomandationIds(dataResult));
        }
    }, [dataResult])

    useEffect(() => {
        if (recomandationIds) {
            // sendSomeWhere(recomandationIds);
            console.log(recomandationIds);
        }
    }, [recomandationIds])

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