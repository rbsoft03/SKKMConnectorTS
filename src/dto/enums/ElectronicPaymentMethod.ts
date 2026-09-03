/**Признак способа оплаты безналичными */
export enum ElectronicPaymentMethod{
 
    /**Предоплата 100%. */
    FullPrepayment = 0,

    /**Предоплата. */
    PartialPrepayment = 1,

    /** Аванс. */
    Advance = 2,

    /**Полный расчёт. */
    FullPayment = 3,

    /**Частичный расчёт и кредит. */
    PartialPaymentAndCredit = 4,

    /**Передача в кредит. */
    CreditTransfer = 5,

    /**Оплата кредита. */
    CreditPayment = 6
}