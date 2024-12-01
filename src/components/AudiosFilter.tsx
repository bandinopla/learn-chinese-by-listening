import { FC } from "react";
import { data } from "../data/data";
import { CheckBox, CheckBoxState } from "./CheckBox";
import { InlinePlayStopLine } from "./InlinePlayStopLine";

export const AudiosFilter: FC <{ audioLinesState:CheckBoxState, onFilterChange?:(audioLinesState:number[])=>void }> = ({ audioLinesState }) => { 

    return data.lines.map( (line, i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3}}>
        <CheckBox index={i} state={audioLinesState} shiftForSingleSelection/>  <span title={line.en}>{line.ch}</span> <InlinePlayStopLine line={line} ignoreKeys/>
    </div> )
}