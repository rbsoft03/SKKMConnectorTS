/** Последняя операция из базы сервера.*/
export class LastOperationDto {
    
    /** Дата и время операции. */
    Date: string = new Date().toISOString();

    /** Тип операции. */
    TaskType: number = 0;

    /** Номер фискального документа. */
    DocNumber: number = 0;

    /** Номер смены. */
    ShiftNumber: number = 0;

    /** Сумма документа. */
    Sum: number = 0;
}