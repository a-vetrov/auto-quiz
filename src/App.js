import React, {useEffect, useState} from 'react';
import './App.css';
import Car from "./components/Car";
import StartButton from "./components/StartButton";
import { Button } from 'antd';
import Question from "./components/Question";
import {MAX_POINTS, quiz} from "./config";
import Flag from "./components/Flag";


const colors = {
    yellow:0,
    red:1,
    blue:2,
} ;

const SHOW_QUESTION = 'show question' ;
const MOVE_BACK = 'move back' ;

function App() {

  const [carScale, setCarScale] = useState(0.5) ;

  const [started, setStarted] = useState(false) ;

  const [position, setPosition] = useState([0,0,0]) ;

  const [status, setStatus] =  useState(null) ;

  const [currentTeam, setCurrentTeam] =  useState(0) ;

  const [currentQuestion, setCurrentQuestion] =  useState(0) ;

  useEffect(() => {
      setCarScale(window.innerHeight / 10 / 250)
  }, []) ;

  const handleStart = () => setStarted(true) ;

  const handleAnswerBeforeTimer = () => setStatus(MOVE_BACK) ;
  const handleBreakRule = () => setStatus(MOVE_BACK) ;
  const handleShowNewQuestion = () => setStatus(SHOW_QUESTION) ;

  const getStatusMessage = () => {
     switch (status) {
         case MOVE_BACK : return 'Выберите, какую машинку сдвинуть назад' ;
         case SHOW_QUESTION :
             if(currentTeam !== null)
                return `Вопрос для ${['желтой', 'красной', 'синей'][currentTeam]} команды` ;
             else
                 return 'Все игроки дошли до финиша' ;
         default: return null ;
     }
  } ;

  const handleCarClick = color => () => {
     if (status !== MOVE_BACK)
         return ;

     const index = colors[color] ;
     const p = Math.max(position[index] - 1, 0) ;
     const arr = [...position] ;
     arr[index] = p ;
     setPosition(arr) ;
     setStatus(null) ;
  } ;

  const getNextTeam = () => {
      let newTeam = currentTeam + 1 ;

      for (let i=0; i<2; i++) {
          if (newTeam > 2)
              newTeam = 0 ;

          if (position[newTeam] < MAX_POINTS) {
              return newTeam;
          }

          newTeam++ ;
      }
      return null ;
  } ;

  const getQuestion = () => {

      if (status !== SHOW_QUESTION || currentTeam === null)
          return null ;

      const onComplete = correct => {
          if (correct) {
              const p = [...position] ;
              p[currentTeam] ++ ;
              setPosition(p) ;
          }

          const newTeam = getNextTeam() ;
          if (newTeam <= currentTeam)
              setCurrentQuestion(currentQuestion+1) ;
          setCurrentTeam(newTeam) ;

          setStatus(null) ;
      } ;

      const data = quiz[currentQuestion][currentTeam] ;
      return <Question onComplete={onComplete} color={Object.keys(colors)[currentTeam]} {...data}/>
  } ;




  return (
      <>
        <div className="App">
            <div className='cars-container'>
                <Flag />
                {Object.keys(colors).map(color =>
                    <Car color={color} active={started} scale={carScale} position={position[colors[color]]} key={color} onClick={handleCarClick(color)}/> )}
            </div>
        </div>
          <div className='buttons-container'>
              <Button type="primary" size={'large'} onClick={handleShowNewQuestion}>Следующий вопрос</Button>
              <Button size={'large'} onClick={handleAnswerBeforeTimer}>Досрочный ответ</Button>
              <Button type="primary" danger={true} size={'large'} onClick={handleBreakRule}>Нарушение правил</Button>
          </div>
          <div className='status-bar'>
              {getStatusMessage()}
          </div>
          {started ? null : <StartButton onStart={handleStart}/>}
          {getQuestion()}
      </>
  );
}

export default App;
