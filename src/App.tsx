import { useEffect, useRef, useState } from 'react'
import './App.css'
import { data } from './data/data'
import type { Line } from './data/types'
import { ChineseAudio } from './components/ChineseAudio'
import { Chinese } from './components/Chinese'
import { AudiosFilter } from './components/AudiosFilter'
import { Flag } from './components/flag'

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
  const [myAvailableLines, setAvailableLines] = useState<Line[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const typeIndex = useRef(0); 
  const selectedLinesState = useState<number[]>(data.lines.map((_,i)=>i));

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
      else if( ev.code == 'Escape') {
        setQuestion(null);
        setAvailableLines([]); 
        setMyLines([]);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    }

  }, [myLines, showDetails]);

  useEffect(()=>{

    if( myAvailableLines.length>0 && !myLines.length )
    { 
      addRandomLine();
    }

  }, [myAvailableLines, question]);

  useEffect(()=>{
    if( selectedLinesState[0].length==0 ) {
      selectedLinesState[1](data.lines.map((_,i)=>i))
    }
  }, [selectedLinesState])

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
    //addRandomLine();
    const lines = data.lines.filter( (_, i)=>selectedLinesState[0].indexOf(i)>-1 );
    if( !lines.length){
      alert("Select some lines to use...");
      return;
    };

    setAvailableLines( lines ); 
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

    setQuestion({
      line: newLine,
      // subject: props[x] as Prop,
      // guess: props[y] as Prop,
      num: question? question.num+1 : 1
    });


    typeIndex.current++ ;
  } 

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
              <h6 style={{ color:"yellow"}}>{ question.line.en }</h6>
              <Chinese line={question.line} pinzi/>
               
            </div>
          }

          <div>
            <br/>
            <br/>
            <h3>Lines in use: <strong className='statNum'>{ myLines.length }</strong>  --- Lines available: <strong className='statNum'>{myAvailableLines.length}</strong></h3>
            <br/>
            <br/>
            <div className='instructions'><strong>UP ↑</strong> to add a new line.
            <br/> <strong>DOWN ↓</strong> to remove a line.
            <br/> <strong>LEFT ←</strong> to repeat sound.
            <br/> <strong>RIGHT →</strong> to move next.
            <br/> <strong>ESC</strong> quit
            </div>
          </div>
        </div>
      }

      {
        myLines.length == 0 && <>
        
        <Flag/>
        <h3>Play audio clips randomly, repeat them, and then read what they say.</h3>
        <div>Add or Remove lines as you need, it's up to you... ( work in progress )</div>
        <br/>
        <br/>
        <button onClick={startQuiz} style={{ fontSize: "3em"}}>
        开 始  →
        </button>

        <div style={{ marginTop:40 }}>
          <h3>Select audio lines to use (SHIFT+select for single selection)</h3> 
          <AudiosFilter audioLinesState={selectedLinesState}/>
        </div>
        </>
      } 
      

      <div style={{ position:"absolute", top: -10, left: 0, transform:"rotate(90deg)", transformOrigin:"bottom left", opacity: 0.95}}>
        by <a href="https://github.com/bandinopla" target='_blank'>Bandinopla</a> | <a href="https://github.com/bandinopla/learn-chinese-by-listening" target='_blank'>open source</a></div>


    </>
  )
}

export default App
