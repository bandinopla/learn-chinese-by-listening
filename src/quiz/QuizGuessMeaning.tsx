import { FC } from "react"; 
import { Chinese } from "../components/Chinese";
import type { Line } from "../data/types";
import { ChineseAudio } from "../components/ChineseAudio";

export const QuizGuessMeaning :FC<{ line:Line }> = ({ line }) => {
    return <div>
        <ChineseAudio line={ line }/>
        <Chinese line={ line } pinzi />
    </div>
}