import { Link } from "react-router-dom";

function Main() {
    return (
        <div className='react-quiz container'>
            <h1 className='react-quiz-heading'>Какой витаминный комплекс
                подойдет именно вам?</h1>
            <p className='react-quiz-text'>ответьте на X вопросов и мы подберем идеальное решение для вас</p>
            <Link to="/quiz"><button className='react-quiz-btn'>Начать</button></Link>
        </div>
    );
}

export default Main;