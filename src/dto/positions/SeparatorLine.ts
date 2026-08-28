import { LineStyle } from "../enums/LineStyle.js";
import { Position } from "./Position.js";

/** Разделительная линия. */
export class SeparatorLine extends Position{
    
    /**Стиль разделительной линии*/
    lineStyle:LineStyle = LineStyle.Solid;
}