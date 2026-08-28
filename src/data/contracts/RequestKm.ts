/**Параметры проверяемого кода маркировки.*/
export class RequestKm {
    
    /** Идентификатор запроса проверки. */
    Guid?: string;

    /** Не отправлять запрос на сервер ОИСМ (только локальная проверка). */
    NotSendToServer: boolean = false;

    /** Ждать ответ ОИСМ. */
    WaitForResult: boolean = false;

    /** Код маркировки в Base64. */
    MarkingCode?: string;

    /** Планируемый статус товара (тег 2003). */
    PlannedStatus: number = 0;

    /** Количество предмета расчёта. */
    Quantity: number = 0;

    /** Мера количества предмета расчёта (таблица 114 ФФД). */
    MeasureOfQuantity: number = 0;

    /** Числитель дробного количества маркированного товара. */
    FractionalQuantityNumerator?: number;

    /** Знаменатель дробного количества маркированного товара. */
    FractionalQuantityDenominator?: number;
}