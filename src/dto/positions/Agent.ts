/** Данные агента в чеке. */
export class Agent {

    /** Операция платежного агента. */
    PayingAgentOperation?: string;

    /** Телефон платежного агента. */
    PayingAgentPhone?: string[];

    /** Телефон оператора по приему платежей. */
    ReceivePaymentsOperatorPhone?: string[];

    /** Телефон оператора перевода. */
    MoneyTransferOperatorPhone?: string[];

    /** Наименование оператора перевода. */
    MoneyTransferOperatorName?: string;

    /** Адрес оператора перевода. */
    MoneyTransferOperatorAddress?: string;
    
    /** ИНН оператора перевода. */
    MoneyTransferOperatorVatin?: string;
}