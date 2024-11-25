import { useEffect, useRef, useState } from 'react'
import './App.css'
import { data } from './data/data'
import type { Line } from './data/types'
import { ChineseAudio } from './components/ChineseAudio'
import { Chinese } from './components/Chinese'

//const props = ["audio", "ch", "en"];

type Question = {
  line: Line
  //subject: Prop
  // guess: Prop
  num: number
}

function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [myLines, setMyLines] = useState<Line[]>([]);
  const [myAvailableLines, setAvailableLines] = useState<Line[]>(data.lines.slice(0));
  const [question, setQuestion] = useState<Question | null>(null);
  const typeIndex = useRef(0); 

  useEffect(() => {

    if (myLines.length > 0 && !question) {
      pickRandomQuestion();
    }

  }, [myLines, question]);

  useEffect(() => {

    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.code == 'ArrowRight') {
 
        if (myLines.length == 0) {
          startQuiz();
        }
        else {

          if (!showDetails) {
            setShowDetails(true);
            return;
          }
  
          setShowDetails(false);

          pickRandomQuestion();
        }

      }
      else if( ev.code == 'ArrowUp' )
      {
        addRandomLine()
      }
      else if(ev.code == 'ArrowDown') {
        addRandomLine(true)
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    }

  }, [myLines, showDetails]);

  const addRandomLine = ( quitar?:boolean ) => {
    const i = Math.floor(Math.random() * myAvailableLines.length);
    const lines = myAvailableLines.slice(0);


    if( quitar )
    {
      if( myLines.length>1 ) {
        const last = myLines.pop()!;
        setAvailableLines([ ...myAvailableLines, last ]);
        setMyLines([ ...myLines ]);
      }
      return;
    }

    if( myAvailableLines.length==0 )
    {
      return;
    }

    
    const itm = lines.splice(i, 1)[0];

    setAvailableLines(lines);
    setMyLines([...myLines, itm]);
  }

  const startQuiz = () => {
    addRandomLine();
  }

  const pickRandomQuestion = () => {
    // const x = typeIndex.current % props.length;
    // const y = Math.floor(typeIndex.current / props.length) % props.length;

    // if (x == y) {
    //   typeIndex.current++;
    //   pickRandomQuestion();
    //   return;
    // }

    
    const randomIndex = Math.floor(Math.random() * myLines.length);
    const newLine = myLines[randomIndex]; 

    

    if( newLine==question?.line && myLines.length>1){  
      pickRandomQuestion();
      return;
    }   

    console.log("RANDOM: ", newLine.ch)

    setQuestion({
      line: newLine,
      // subject: props[x] as Prop,
      // guess: props[y] as Prop,
      num: question? question.num+1 : 1
    });


    typeIndex.current++

  }

  console.log(question)

  return (
    <>
      {/* <QuizContext.Provider value={{ nextQuestion:pickRandomQuestion }}>
        {question != null && <GuessCorrectOption line={question.line} subject={question.subject} guess={question.guess} availableLines={myLines}/>}
      </QuizContext.Provider> */}

      <div className='logo'>
      通<br/>过<br/>听<br/>来<br/>学<br/>习
      </div>


      {
        question && <div>
          <ChineseAudio line={question.line} autoplay num={question.num}/>
          {
            showDetails && <div style={{ fontSize:"2em"}}>
              <h6>{ question.line.en }</h6>
              <Chinese line={question.line} pinzi/>
               
            </div>
          }

          <div>
            <br/>
            <br/>
            Pool size : <strong>{ myLines.length }</strong>  / Available: {myAvailableLines.length}
            <br/>
            <br/>
            <div className='instructions'><strong>UP ↑</strong> to add a new line.
            <br/> <strong>DOWN ↓</strong> to remove a line.
            <br/> <strong>LEFT ←</strong> to repeat sound.
            <br/> <strong>RIGHT ←</strong> to move next.
            </div>
          </div>
        </div>
      }

      {
        myLines.length == 0 && <>
        <img src="/flag-400.png" alt='chinese flag'/>
        <h3>Play audios, try to repeat them, then read what it said...</h3>
        <div>Add or Remove lines as you need, it's up to you... ( work in progress )</div>
        <br/>
        <br/>
        <button onClick={startQuiz} style={{ fontSize: "3em"}}>
        开 始  →
        </button>
        </>
      }

      <div style={{ position:"absolute", top: -10, left: 0, transform:"rotate(90deg)", transformOrigin:"bottom left", opacity: 0.5}}>
        by <a href="https://github.com/bandinopla" target='_blank'>Bandinopla</a></div>


    </>
  )
}

export default App
