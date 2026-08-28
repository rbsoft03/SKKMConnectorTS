import { Position } from "./Position.js";

/** Текстовая строка. */
export class TextLine extends Position {

    /** Текст строки */
    Text: string = "";

    /** Шрифт. Значение из PrintFont, передаётся строкой (как в C#). */
    Font?: string;
    
    /** Выравнивание. Значение из PrintAlignment, передаётся строкой (как в C#). */
    Alignment?: string;
}