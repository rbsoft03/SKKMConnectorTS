import { PrintFormBarcode } from "../results/PrintFormBarcode.js";
import { SeparatorLine } from "../positions/SeparatorLine.js";
import { Picture } from "../results/Picture.js";

/** Строка печатного шаблона. */
export class PrintLine {
    /**
     * Тип строки: 0 — фискальная; 1 — текстовая; 2 — штрихкод; 3 — изображение; 4 — разделительная линия.
     * Если не указано — 1 (текстовая).
     */
    Type: number = 1;

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
    Alignment: number = 0;

    /**
     * Шрифт: 0 — обычный; 1 — жирный; 2 — мелкий; 3 — средний; 4 — крупный; 5–9 — H1–H5.
     * Если не указано — 0.
     */
    Font: number = 0;

    /** Перенос строк: false — строка обрезается; true — переносится. Если не указано — true. */
    Wrap: boolean = true;

    /** Штрихкод. */
    Barcode?: PrintFormBarcode;

    /** Разделительная линия. */
    SeparatorLine?: SeparatorLine;

    /** Изображение. */
    Picture?: Picture;
}