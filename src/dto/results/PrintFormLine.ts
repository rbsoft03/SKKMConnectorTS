import type { PrintAlignment } from "../enums/PrintAlignment.js";
import type { PrintFont } from "../enums/PrintFont.js";
import type { PrintLineType } from "../enums/PrintLineType.js";
import { SeparatorLine } from "../positions/SeparatorLine.js";
import type { Picture } from "./Picture.js";
import { PrintFormBarcode } from "./PrintFormBarcode.js";

/** Строка печатной формы. */
export class PrintFormLine {
    /** Тип строки. Если не указано — Text.*/
    Type?: PrintLineType;

    /** Текст строки (левая часть). */
    Line?: string;

    /** Текст строки (правая часть). */
    LineRight?: string;

    /**Выравнивание. Если не указано — Left. */
    Alignment?: PrintAlignment;

    /** Шрифт. Если не указано — Normal. */
    Font?: PrintFont;

    /** Признак, что шрифт задан явно во входящих данных или при создании строки. */
    IsFontSpecified: boolean = false;

    /** Ширина. Если не указано — 0 (по содержимому). */
    Width: number = 0;

    /** Масштаб. Если не указано — 100%. */
    Scale: number = 100;

    /** Признак переноса строк: false — строка обрезается; true — переносится. */
    Wrap: boolean = true;

    /** Разделительная линия. */
    SeparatorLine?: SeparatorLine;

    /** Изображение. */
    Picture?: Picture;

    /** Штрихкод. */
    Barcode?: PrintFormBarcode;

    /** Строки, выводимые справа или слева от штрихкода. */
    BarcodeLines?: string[];

    /** Признак создания строки из печатного шаблона. */
    IsCreateFromTemplate: boolean = false;
}