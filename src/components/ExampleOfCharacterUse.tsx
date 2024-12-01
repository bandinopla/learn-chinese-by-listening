import { FC } from "react";
import { InlinePlayStopLine } from "./InlinePlayStopLine";
import { data } from "../data/data";
import { shuffleArray } from "../util/shuffle";
import { Chinese } from "./Chinese";

export const ExampleOfCharacterUse : FC<{ hanzi:string }> = ({ hanzi }) => {

    const line = shuffleArray( data.lines ).find( line=>line.ch.indexOf( hanzi )>-1 )!;

    return <div style={{ fontSize:"2em"}}> 
    <InlinePlayStopLine line={line}/>
    <div style={{ color:"#aaf", fontWeight:"bold"}}>{ line.en }</div>
    <Chinese pinzi line={line}/>
    </div>
}