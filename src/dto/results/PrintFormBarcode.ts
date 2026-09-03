import type { BarcodeType } from "../enums/BarcodeType.js";

/** Штрихкод в печатной форме. */
export class PrintFormBarcode {
    
    /** Тип штрихкода. */
    Type?: BarcodeType;

    /** Значение штрихкода. */
    Value?: string;

    /** Изображение штрихкода, закодированное в Base64. */
    PictureBase64?: string;

    /** Способ печати текста штрихкода: 0 — не печатать; 1 — снизу; 2 — сверху; 3 — сверху и снизу. */
    PrintText: number = 0;

    /** Высота штрихкода в точках. Допустимые значения: 0..1199. */
    Height: number = 0;

    /** Ширина штриха в точках. Допустимые значения: 0..1199. Рекомендуемое значение — 2. */
    BarWidth: number = 2;
}