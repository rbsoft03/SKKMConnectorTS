/** Разбивка суммы операций по видам оплаты. */
export class DocDataPayments {

    /** Общая сумма оплат. */
    Sum: number = 0;

    /** Наличные. */
    Cash: number = 0;

    /** Безналичные. */
    Electronically: number = 0;

    /** Аванс (предоплата). */
    Prepaid: number = 0;

    /** Кредит (постоплата). */
    Credit: number = 0;
    
    /** Встречные предоставления (бартер). */
    Barter: number = 0;
}