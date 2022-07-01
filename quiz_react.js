'use strict';

const { useState, useEffect } = React;
const { HashRouter, Route, Link, useHistory } = ReactRouterDOM;

function App() {
  const [result, setResult] = useState({});

  return (
    <HashRouter basename='/' hashType='noslash'>
      <Route exact={true} path='/'
        render={() =>
          <Main />
        }
      />
      <Route exact={true}
        path='/quiz'
        render={() =>
          <Quiz setResult={setResult} />
        }
      />
      <Route exact={true}
        path='/result'
        render={() =>
          <Result result={result} />
        }
      />
    </HashRouter>
  )
}


function Main() {
  return (
    <div className='react-quiz container'>
      <h1 className='react-quiz-heading'>Какой витаминный комплекс
        подойдет именно вам?</h1>
      <p className='react-quiz-text'>ответьте на X вопросов и мы подберем идеальное решение для вас</p>
      <Link to='/quiz'><button className='react-quiz-btn'>Начать</button></Link>
    </div>
  );
}

const Quiz = ({ setResult }) => {
  let history = useHistory();

  const [currTest, setCurrTest] = useState(0);
  const [currQues, setCurrQues] = useState(0);
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    let dataLocalSt = JSON.parse(localStorage.getItem('questions'));
    let currQuesLocalSt = parseInt(localStorage.getItem('currQues'));
    let currTestLocalSt = parseInt(localStorage.getItem('currTest'));

    if (dataLocalSt) {
      setQuestions(dataLocalSt);
      setCurrQues(currQuesLocalSt || 0);
      setCurrTest(currTestLocalSt || 0);
    } else {
      fetch('catalog/view/javascript/data.json').then((response) => {
        return response.json();
      })
        .then((data) => {
          setQuestions(data);
        })

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
          localStorage.setItem('dataResult', JSON.stringify(dataResult));
          history.push('/result');
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
        history.push('/');
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

  if (Object.keys(questions).length == 0)
    return <div>Loading...</div>

  return (
    <div className='react-quiz container'>
      <p className='react-quiz-countQ'>Вопрос {currTest == 0 ? currQues + 1 : questions[0].length + currQues + 1} из {currTest == 0 ? 'X' : questions[currTest].length + questions[0].length}</p>
      <h1 className='react-quiz-heading'>{questions[currTest][currQues].title}</h1>
      <div className='react-quiz__questions'>
        {questions[currTest][currQues].columns.map((column) => (
          <div key={questions[currTest][currQues].name + column.key} onClick={() => handleSelect(column.key)} className={column.selected ? 'react-quiz__questionBlock selected' : 'react-quiz__questionBlock'}>
            <div className='react-quiz__question'>
              {column.img ? <img src={`/image/catalog/quiz/${column.img}`} alt={column.mainText} className='react-quiz__question-img' /> : <p className='react-quiz__question-mainText'>{column.mainText}</p>}
            </div>
            <p className='react-quiz__question-text'>{column.text}</p>
          </div>
        ))}
      </div>
      <div className='react-quiz__controls'>
        <button
          className='react-quiz__controls-btnNext'
          onClick={handleNext}
        >Следующий вопрос</button>
        <p
          className='react-quiz__controls-btnPrev'
          onClick={handlePrev}
        >Вернуться назад</p>
      </div>
    </div>
  );
};

function Result({ result }) {
  let dataResult = result;
  const [recomandationIds, setRecomandationIds] = useState('');

  if (!Object.keys(result).length) {
    dataResult = JSON.parse(localStorage.getItem('dataResult'))
  }

  useEffect(() => {
    setRecomandationIds(getRecomandationIds(dataResult));
  }, []);

  return (
    <div className='react-quiz container'>
      <h1 className='react-quiz-heading'>Вы ответили на все вопросы!</h1>
      <p className='react-quiz-text'>Пройти опрос еще раз?</p>
      <br />
      <Link to='/quiz'><button className='react-quiz-btn'>К тесту</button></Link>
    </div>
  );
}

function getRecomandationIds(dataResult) {
  const selectedTest = Object.keys(dataResult)[1];
  let filtered;

  switch (selectedTest) {
    case '1': // Иммунитет
      filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
      return filtered.length > 1 ? '19223,18803,13418,18802,14538,14562,15873' : '16084'
    case '2': // Опорно-двигательный аппарат
      filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
      return filtered.length > 0 ? '9151,16627,19223,18803,7746,18088' : '16084'
    case '3': // Женское здоровье
      filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
      return filtered.length > 0 ? '18806,20848,7773,18802,14562,18803,9207,13242' : '16084'
    case '4': // Кожа/ногти/волосы
      filtered = dataResult[selectedTest][4].columns[0].selected;
      return filtered ? '21254,18088,15874,19223,14562,18803,14562,18802,7773,14538' : '21254,18088,15874,19223,14562,18803,14562,18802,7773'
    case '5': // Пищеварение
      filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
      return filtered.length > 0 ? '13418,17909,14538,9207,16164' : '16084'
    case '6': // Похудение TODO расчет массы тела
      filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
      // return filtered.length > 0 ? '14503,21603,21137,15873,13418,7695,14562,7773,14544' : '16084'
      return '14503,21603,21137,15873,13418,7695,14562,7773,14544'
    case '7': // Память, внимание, эмоции
      filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
      return filtered.length > 0 ? '20848,21254,14562,16627,16164,14538,19762' : '16084'
    case '8': // Здоровье сердца и сосудов
      filtered = dataResult[selectedTest][0].columns[0].selected;
      return filtered.length > 0 ? '7773,15507,14538,14562,15874,17909,19762' : '16084'
    case '9': // Планирование беременности
      filtered = dataResult[selectedTest].filter((question) => !question.columns[2].selected);
      return filtered.length > 0 ? '16164,14562,20848,13242,9207' : '16084'
    case '10': // Зрение
      filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
      return filtered.length > 0 && (dataResult[0][1].columns[2].selected || dataResult[0][1].columns[3].selected) ? '15507,17909,19762' : '16084'
    case '11': // Здоровье щитовидной железы
      filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
      return filtered.length > 0 ? '21254,14562,19762,18806' : '16084'
    case '12': // Герпетическая инфекция
      filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
      return filtered.length > 0 ? '18809,17909,22060,18802' : '16084'
    case '13': // Мужское здоровье
      return '18802,9207,7695,7741,16164,14562,20848,13242'
    case '14': // Обмен веществ
      filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
      return filtered.length > 0 ? '19762,14562,21137,17909,14544,14538' : '16084'
    case '15': // TODO Нет теста для Поддержка организма в зрелом возрасте
      filtered = dataResult[selectedTest].filter((question) => question.columns[0].selected);
      return filtered.length > 0 ? '21254' : '16084'
    default:
      return '0';
  }
}

const domContainer = document.querySelector('#react-quiz');
ReactDOM.render(<App />, domContainer);