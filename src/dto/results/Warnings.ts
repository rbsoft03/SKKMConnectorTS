/** Предупреждения ФН. */
export class Warnings {

    /** Критическая ошибка ФН. */
    CriticalError: boolean = false;

    /** Память ФН переполнена. */
    MemoryOverflow: boolean = false;

    /** Требуется срочная замена ФН. */
    NeedReplacement: boolean = false;

    /** Превышено время ожидания ответа от ОФД. */
    OfdTimeout: boolean = false;
    
    /** Исчерпан ресурс ФН. */
    ResourceExhausted: boolean = false;
}