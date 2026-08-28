/**Тело запроса подтверждения кода маркировки.*/
export class RequestConfirmKm {
    
    /** Имя кассы. */
    DeviceName?: string;

    /** Идентификатор запроса проверки кода маркировки. */
    GUID?: string;

    /** Тип подтверждения: 0 - включить в документ, 1 - не включать. */
    ConfirmationType: number = 0;
}