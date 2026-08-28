/** Сведения об оплате безналичными. */
export class ElectronicPayment {
    
    /** Сумма оплаты безналичными. */
    Amount: number = 0;

    /** Признак способа оплаты безналичными. */
    PaymentMethod?: number;

    /** Идентификаторы безналичной оплаты. */
    Identifiers?: string;

    /** Дополнительные сведения о безналичной оплате. */
    AdditionalInformation?: string;
}