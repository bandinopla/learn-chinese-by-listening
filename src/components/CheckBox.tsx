import React, { FC } from "react";
import style from "./CheckBox.module.css";

export type CheckBoxState = [ number[], React.Dispatch<React.SetStateAction<number[]>> ];

export const CheckBox : FC<{ index:number, onlyOne?:boolean, state:CheckBoxState, correction:boolean|undefined, disabled?:boolean }> = ({ index, onlyOne, state, correction, disabled })=>{
    const marked = state[0].indexOf(index)>-1;

    const onClick = () => {

        if( disabled || correction!==undefined ) return;
        
        if( onlyOne )
        {
            state[1]( marked? [] : [ index ]);
        }
    }
//style={{ background: marked ?"black" : "white", width:20, height:20, cursor:"pointer", border:"10px solid white"}}
    return <div onClick={onClick} className={ [ style.checkbox, marked? style.marked : "", correction!==undefined? correction? style.correct : style.incorrect : "" ].join(" ") }>
            </div>
}