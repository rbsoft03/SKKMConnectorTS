import { DocData } from "./DocData.js";

/** Счетчики фискальных операций за кассовую смену. */
export class ShiftCounters {

    /** Общая сумма коррекций за смену. */
    SumCorrection: number = 0;

    /** Количество коррекций за смену. */
    NumberCorrections: number = 0;

    /** Приход. */
    Sales?: DocData;

    /** Возврат прихода. */
    SalesReturn?: DocData;

    /** Коррекция прихода. */
    SalesCorrection?: DocData;

    /** Коррекция возврата прихода. */
    SalesReturnCorrection?: DocData;

    /** Расход. */
    Purchases?: DocData;

    /** Возврат расхода. */
    PurchasesReturn?: DocData;

    /** Коррекция расхода. */
    PurchasesCorrection?: DocData;
    
    /** Коррекция возврата расхода. */
    PurchasesReturnCorrection?: DocData;
}