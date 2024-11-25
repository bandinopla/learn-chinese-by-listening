import { FC, useContext, useMemo, useState } from "react"; 
import { Chinese } from "../components/Chinese";
import type { Line } from "../data/types";
import { ChineseAudio } from "../components/ChineseAudio"; 
import { CheckBox } from "../components/CheckBox";
import { AnswerButton } from "../components/AnswerButton"; 
import { QuizContext } from "./QuizContext";
 
export type Prop = "audio" | "ch" | "en";

export const GuessCorrectOption :FC<{ line:Line, subject:Prop, guess:Prop, availableLines:Line[] }> = ({ line, subject, guess, availableLines }) => {

    const context = useContext(QuizContext);
    const checkboxStates = useState<number[]>([]);
    const [userOption, setUserOption] = useState<Line|undefined>();
    const isAnswered = userOption!==undefined;

    const options = useMemo(()=>{

        const _options = [ line ];
        let runs = 0;

        // pick other lines...
        while( _options.length<5 ) // TODO: aumentar numero con el incremento de dificultad??
        {
            if( ++runs>100 ) 
            {
                break;
            }
            
            const random = availableLines[ Math.floor( Math.random()*availableLines.length ) ];
            if( random==line || _options.find(o=>o==random) ) continue;
            _options.push( random );
        }


        setUserOption(undefined);
        checkboxStates[1]([]);
        return _options;


    }, [line, subject, guess]);

    const answerQuestion = ()=>{
        const selectedOption = options[ checkboxStates[0][0] ];

        if(!selectedOption) return;
 
        setUserOption( selectedOption );

        return selectedOption==line;
    }
    

    return <div>
        
        
        { /* HINT */
            subject=='audio'? <ChineseAudio line={ line } autoplay/> :
            subject=='ch'? <Chinese line={ line } /> : 
            subject=='en'? <h3>{ line.en }</h3> : "??????"
        } 
        <br/>
        { /* GUESS */
            options.map( (option,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:30, marginBottom:25}}>

                <div>
                    <CheckBox disabled={isAnswered} index={i} state={checkboxStates} onlyOne correction={ userOption? userOption==option? option==line  : option==line? true : undefined : undefined }/> 
                </div>

                <div style={{ fontSize:"0.8em", display:"flex",flexDirection:"column", alignItems:"flex-start"}}>
                    { 
                        isAnswered? <>
                                    <ChineseAudio line={ option }/>
                                    <Chinese line={ option } pinzi/> 
                                    <h3>{ option.en }</h3>
                                    </> : 
                        /* OPTION */
                        guess=='audio'? <ChineseAudio line={ option }/> :
                        guess=='ch'? <Chinese line={ option } /> : 
                        guess=='en'? <h3>{ option.en }</h3> : "??????"
                    } 
                </div>
            </div> )
        }
        <br/>
        {
            isAnswered? <button onClick={context.nextQuestion}>Next</button> : 
            <button onClick={answerQuestion}>Answer</button>
        }
    </div>
}