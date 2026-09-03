import { PrintFormBarcode } from "../results/PrintFormBarcode.js";
import { SeparatorLine } from "../positions/SeparatorLine.js";
import { Picture } from "../results/Picture.js";
import type { PrintLineType } from "../enums/PrintLineType.js";
import type { PrintAlignment } from "../enums/PrintAlignment.js";
import type { PrintFont } from "../enums/PrintFont.js";

/** Строка печатного шаблона. */
export class PrintLine {
    /**
     * Тип строки.
     * Если не указано — (текстовая).
     */
    Type?: PrintLineType;

    /** Ширина. Если не указано — 0 (по содержимому). */
    Width: number = 0;

    /** Масштаб. Если не указано — 100%. */
    Scale: number = 0;

    /** Текст строки (левая часть). */
    Line?: string;

    /** Текст строки (правая часть). */
    LineRight?: string;

    /**
     * Выравнивание: 0 — по левому краю; 1 — по центру; 2 — по правому краю; 3 — по ширине.
     * Если не указано — слева.
     */
    Alignment?: PrintAlignment;

    /**Шрифт.*/
    Font?: PrintFont;

    /** Перенос строк: false — строка обрезается; true — переносится. Если не указано — true. */
    Wrap: boolean = true;

    /** Штрихкод. */
    Barcode?: PrintFormBarcode;

    /** Разделительная линия. */
    SeparatorLine?: SeparatorLine;

    /** Изображение. */
    Picture?: Picture;
}