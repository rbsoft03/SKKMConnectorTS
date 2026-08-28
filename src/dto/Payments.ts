/** Оплаты. */
export class Payments {
    
    /** Сумма наличной оплаты. */
    Cash: number = 0;

    /** Сумма безналичными средствами. */
    ElectronicPayment: number = 0;

    /** Сумма предоплатой (зачетом аванса). */
    AdvancePayment: number = 0;

    /** Сумма постоплатой (в кредит). */
    Credit: number = 0;

    /** Сумма встречным предоставлением. */
    CashProvision: number = 0;
}