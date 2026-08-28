import { SeparatorLine } from "../positions/SeparatorLine.js";
import { PrintFormBarcode } from "./PrintFormBarcode.js";

/** Строка печатной формы. */
export class PrintFormLine {
    /**
     * Тип строки: 0 — фискальная; 1 — текстовая; 2 — штрихкод; 3 — изображение; 4 — разделительная линия.
     * Если не указано — 1 (текстовая).
     */
    Type: number = 1;

    /** Текст строки (левая часть). */
    Line?: string;

    /** Текст строки (правая часть). */
    LineRight?: string;

    /** Выравнивание: 0 — по левому краю; 1 — по центру; 2 — по правому краю; 3 — по ширине. */
    Alignment: number = 0;

    /** Шрифт: 0 — обычный; 1 — жирный; 2 — мелкий; 3 — средний; 4 — крупный; 5–9 — H1–H5. */
    Font: number = 0;

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

    /** Штрихкод. */
    Barcode?: PrintFormBarcode;

    /** Строки, выводимые справа или слева от штрихкода. */
    BarcodeLines?: string[];

    /** Признак создания строки из печатного шаблона. */
    IsCreateFromTemplate: boolean = false;
}