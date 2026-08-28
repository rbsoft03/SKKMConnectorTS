/**Базовый результат операции: код, описание, успех.*/
export class ResponseResultBase {
    
    /** Код результата (0 - успех). */
    Code: number = 0;

    /** Описание результата или ошибки. */
    Description?: string;

    /** Признак успешного выполнения. */
    Success: boolean = false;
}