import { Position } from "./Position.js";

/** Текстовая строка. */
export class TextLine extends Position {

    /** Текст строки */
    Text: string = "";

    /** Шрифт. */
    Font?: string;
    
    /** Выравнивание. */
    Alignment?: string;
}