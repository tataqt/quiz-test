import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from '../data';

const Quiz = ({ setResult }) => {
    let navigate = useNavigate();

    const [currTest, setCurrTest] = useState(0);
    const [currQues, setCurrQues] = useState(0);
    const [questions, setQuestions] = useState(data);

    useEffect(() => {
        let dataLocalSt = JSON.parse(localStorage.getItem('questions'));
        let currQuesLocalSt = parseInt(localStorage.getItem('currQues'));
        let currTestLocalSt = parseInt(localStorage.getItem('currTest'));

        if (dataLocalSt) {
            setQuestions(dataLocalSt);
            setCurrQues(currQuesLocalSt || 0);
            setCurrTest(currTestLocalSt || 0);
        } else {
            setQuestions(data);
            setCurrQues(0);
        }
    }, [])

    const handleNext = () => {
        if (checkIsSlelected()) {
            if (currQues >= questions[currTest].length - 1) {
                if (currTest > 0) {
                    localStorage.removeItem('questions');
                    localStorage.removeItem('currQues');
                    localStorage.removeItem('currTest');

                    let dataResult = {};
                    dataResult = { 0: [...questions[0]] };
                    dataResult[currTest] = [...questions[currTest]];
                    setResult(dataResult);

                    navigate('/result');
                } else {
                    localStorage.setItem('questions', JSON.stringify(questions));
                    localStorage.setItem('currQues', currQues);
                    localStorage.setItem('currTest', currTest);

                    let keyTest = checkIsSlelected();

                    setCurrTest(keyTest.key)
                    setCurrQues(0);
                }
            } else {
                setCurrQues(currQues + 1);
                localStorage.setItem('questions', JSON.stringify(questions));
                localStorage.setItem('currQues', currQues);
                localStorage.setItem('currTest', currTest);
            }
        }
    };

    const handlePrev = () => {
        if (currQues > 0) {
            setCurrQues(currQues - 1);
        } else {
            if (currTest <= 0) {
                navigate('/');
            }

            setCurrTest(0)
            setCurrQues(questions[0].length - 1);
        }
    };

    const handleSelect = (item) => {
        setQuestions(prev => {
            prev[currTest][currQues].columns.forEach((element, index) => {
                prev[currTest][currQues].columns[index] = element.key === item ? { ...element, selected: true } : { ...element, selected: false }
            });
            return { ...prev };
        })
    }

    const checkIsSlelected = () => {
        return questions[currTest][currQues].columns.find((element) => element.selected === true);
    }
    
    if (Object.keys(questions).length === 0)
        return <div>Loading...</div>

    return (
        <div className="react-quiz container">
            <p className="react-quiz-countQ">Вопрос {currTest === 0 ? currQues + 1 : questions[0].length + currQues + 1} из {currTest === 0 ? 'X' : questions[currTest].length + questions[0].length}</p>
            <h1 className="react-quiz-heading">{questions[currTest][currQues].title}</h1>
            <div className="react-quiz__questions">
                {questions[currTest][currQues].columns.map((column) => (
                    <div key={questions[currTest][currQues].name + column.key} onClick={() => handleSelect(column.key)} className={column.selected ? 'react-quiz__questionBlock selected' : 'react-quiz__questionBlock'}>
                        <div className="react-quiz__question">
                            {column.img ? <img src={`https://fitomarket.com.ua/image/catalog/quiz/${column.img}`} alt={column.mainText} className="react-quiz__question-img" /> : <p className="react-quiz__question-mainText">{column.mainText}</p>}
                        </div>
                        <p className="react-quiz__question-text">{column.text}</p>
                    </div>
                ))}
            </div>
            <div className="react-quiz__controls">
                <button
                    className="react-quiz__controls-btnNext"
                    onClick={handleNext}
                >Следующий вопрос</button>
                <p
                    className="react-quiz__controls-btnPrev"
                    onClick={handlePrev}
                >Вернуться назад</p>
            </div>
        </div>
    );
};


export default Quiz;