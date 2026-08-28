/** Оплаты из ответа сервера (Payments). */
export class CheckPayments {
    
    /** Сумма наличной оплаты. */
    Cash: number = 0;

    /** Сумма безналичными средствами. */
    Electronic: number = 0;

    /** Сумма предоплатой (зачётом аванса). */
    PrePaid: number = 0;

    /** Сумма постоплатой (в кредит). */
    Credit: number = 0;

    /** Сумма встречным предоставлением. */
    Barter: number = 0;
}