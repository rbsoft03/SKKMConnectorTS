import { DocDataPayments } from "./DocDataPayments.js";
import { RegData } from "./RegData.js";

/** Счетчик документов. */
export class DocData {

    /** Количество документов. */
    Count: number = 0;

    /** Сумма по документам. */
    Sum: number = 0;

    /** Разбивка суммы по видам оплаты. */
    Payments?: DocDataPayments;

    /** Скидки: количество и сумма. */
    Discount?: RegData;
    
    /** Надбавки (наценки): количество и сумма. */
    Adding?: RegData;
}