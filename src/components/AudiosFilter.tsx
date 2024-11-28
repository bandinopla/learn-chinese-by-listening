import { FC, useState } from "react";
import { data } from "../data/data";
import { CheckBox, CheckBoxState } from "./CheckBox";

export const AudiosFilter: FC <{ audioLinesState:CheckBoxState, onFilterChange:(audioLinesState:number[])=>void }> = ({ audioLinesState, onFilterChange }) => { 

    return data.lines.map( (line, i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3}}>
        <CheckBox index={i} state={audioLinesState} shiftForSingleSelection/> {line.ch}
    </div> )
}