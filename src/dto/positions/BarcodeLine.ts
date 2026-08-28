import { Position } from "./Position.js";

/** Штрихкод. */
export class BarcodeLine extends Position {

    /** Тип штрихкода */
    Type: string = "";

    /** Значение штрихкода */
    Barcode: string = "";

    /** Значение штрихкода в Base64 */
    ValueBase64?: string;
    
    /** Выравнивание штрихкода */
    Alignment?: string;
}