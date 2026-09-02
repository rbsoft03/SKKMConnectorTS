/**Признак способа расчёта (тег 1214 ФФД). */
export enum SignMethodCalculation{
    
    /**Не применяется. */
    NotApplicable = 0,

    /**Предоплата полная. */
    FullPrepayment = 1,

    /**Предоплата частичная. */
    PartialPrepayment = 2,

    /**Аванс. */
    Advance = 3,

    /**Полная оплата. */
    FullPayment = 4,

    /**Частичная оплата и кредит. */
    PartialPaymentAndCredit = 5,

    /**Передача в кредит. */
    CreditTransfer = 6,

    /**Оплата кредита. */
    CreditPayment = 7,
}