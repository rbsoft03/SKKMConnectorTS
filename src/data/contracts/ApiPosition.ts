import { DocPosition } from "./DocPosition.js";
import { FiscalLine } from "../../dto/positions/FiscalLine.js";

/**Позиция чека: фискальная строка, либо текст/штрихкод.*/
export class ApiPosition extends DocPosition {
    /** Фискальная строка. */
    FiscalString?: FiscalLine;
}