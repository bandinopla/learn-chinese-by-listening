import { FC, useEffect, useMemo, useState } from "react";
import { CharacterDicc, CharacterInfo, Line } from "../data/types";
import { removeNonChinese } from "../data/data";
import charMap from "../data/characterMap.json";
import classes from "./TypeCharacter.module.css";
import { ExampleOfCharacterUse } from "./ExampleOfCharacterUse";

type Char = { hanzi:string } & CharacterInfo;

const removeAccents = (str:string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");


export const TypeCharacter:FC<{ line:Line, num:number, onFinish:()=>void }> = ({ line, num, onFinish }) => {

    const soup = useMemo(()=>{

        const arr:Char[] = [];
        
        removeNonChinese( line.ch ).split("").forEach( char => {

            if( !arr.find(c=>c.hanzi==char) )
            {
                arr.push({
                    hanzi: char, ...(charMap as CharacterDicc)[char]
                });
            }

        });

        return arr;

    }, [line, num]); 

    const [index, setIndex] = useState(0);
    const [utext, setUText] = useState("");
    const [result, setResult] = useState<boolean|undefined>(undefined);

    const options = useMemo(()=>{

        const ops:Char[] = [];

        if( utext.length>1 ) 
            Object.entries(charMap).forEach(([key, value]) => {
                if( value.pinzi.indexOf(" ")<0 && removeAccents(value.pinzi).indexOf(utext)>-1 && !ops.find(o=>o.pinzi==value.pinzi))
                {
                    ops.push( {
                        hanzi: key,
                        ...value
                    } )
                }
            });

        return ops;

    }, [utext]);

    const [userOption, setUserOption] = useState(-1);

    useEffect(() => {
      const handleKeyPress = (event:KeyboardEvent) => {
        const { key } = event;
 
        if( typeof result=='boolean' )
        {
            
            if( key=='ArrowRight' || key=='Enter' )
            {
                next();
            } 
            return;
        }

        if( key=='Enter' || !isNaN(Number(key)) )
        {
            const optIndex = options.length>1 && !isNaN(Number(key))? Math.min( parseInt(key) , options.length ) - 1 : 0;
            const char = soup[ index ];

            if( options.length==0 )
            {
                setUserOption(-1);
                setResult(false);
            }
            else 
            {
                setUserOption(optIndex);
                setResult( char.pinzi==options[optIndex].pinzi )
            } 

            return;
        }

        if( key=='ArrowRight' )
        {
            setUText("")
            setUserOption(-1)
            setResult(false)
            return;
        }
  
        // Check for letters (a-z, A-Z)
        if (/^[a-zA-Z]$/.test(key)) {
          setUText((prev) => prev + key);
        }
  
        // Handle backspace to remove the last character
        if (key === "Backspace") {
          setUText((prev) => prev.slice(0, -1));
        }
      };
  
      // Attach event listener
      window.addEventListener("keydown", handleKeyPress);
  
      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }, [options, result]);

    useEffect(()=>{
        setIndex(0)
    }, [num]);

    const next = ()=>{
        const nIndex = index + 1;

        setUText("");
        setUserOption(-1);
        setResult(undefined);

        if( nIndex>=soup.length )
        {
            //finished!
            setIndex(0);
            onFinish();
        }
        else 
        { 
            setIndex( nIndex )
        }
    }


    return <div>
        <h1 className={ classes.hanzi  }>
            { soup[ index ].hanzi}
        </h1> 
        {
            result != null? <>
                                { userOption==-1 && utext.length>0 && <span className={classes.incorrect}>Incorrect → <strong>{utext}</strong></span> }
                                { userOption!==-1 && <span className={ result? classes.correct : classes.incorrect }>{result?"Correct!":"Incorrect!" } → <strong>{userOption>-1? options[ userOption ].pinzi+" ( "+options[ userOption ].hanzi+" )"  :"..."}</strong></span> }
                                <div>
                                    <h1 style={{ color:"yellow", marginBottom:3}}>{ soup[index].pinzi }</h1>
                                    <h3 style={{ color:"yellow", marginBottom:0}}>{ soup[index].means }</h3>
                                    <div style={{ marginTop:20}} className={ classes.example }>
                                        Example of use: <br/><ExampleOfCharacterUse hanzi={ soup[index].hanzi } />
                                    </div>
                                </div>
                            </> :
            <>
            <div>
                <h3>Type the pinzi then ENTER (or NUMBER):</h3>
            </div>
            <div className={ classes.userInput }>
                {utext}<span className={ classes.cursor }>|</span>
            </div>
            <div className={ classes.options }>
                {options.map( (opt,i)=><div key={opt.pinzi}><span className={ classes.numpadKey}>{ options.length==1? "ENTER" : i+1}</span>{ opt.pinzi }</div> )}
            </div>
            </>
        }
        
        
    </div>
}