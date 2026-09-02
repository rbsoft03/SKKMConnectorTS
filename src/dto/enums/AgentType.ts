 /**Признак агента (тег 1222 ФФД).*/
export enum AgentType{
    
    /**Банковский платёжный агент.*/
    BankPaymentAgent = 0,

    /**Банковский платёжный субагент.*/
    BankPaymentSubagent = 1,

    /**Платёжный агент. */
    PaymentAgent = 2,

    /**Платёжный субагент. */
    PaymentSubagent = 3,

    /**Поверенный. */
    Attorney = 4,

    /**Комиссионер. */
    Commissioner = 5,

    /**Агент (иной тип). */
    Agent = 6
}