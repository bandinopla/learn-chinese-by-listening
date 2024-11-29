import { FC } from "react";
import { Line } from "../data/types";
import { ChineseAudio } from "./ChineseAudio";

export const InlinePlayStopLine: FC<{ line:Line }> = ({ line }) => {
    return <div style={{ fontSize:"0.5em"}}><ChineseAudio line={line} num={0}/></div>
}