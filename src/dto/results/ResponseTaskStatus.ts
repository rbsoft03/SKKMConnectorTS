import { DocumentHeader } from "./DocumentHeader.js";

/** Статус задания. */
export class ResponseTaskStatus {

    /** Имя устройства. */
    DeviceName?: string;

    /** Идентификатор документа. */
    DocId?: string;

    /** Дата и время постановки задания в обработку. */
    Date: string = new Date().toISOString();
    
    /** Статус отправки: 0 — новая; 1 — отправлена; 2 — обработана; −1 — ошибка. */
    SentToPrint: number = 0;

    /** Позиция задания в очереди на момент запроса. −1 — задание уже покинуло очередь. */
    NumberInQueue: number = 0;

    /** Размер очереди. */
    QueueSize: number = 0;

    /** Идентификатор пула. Если устройство не входит в пул — не заполняется. */
    PoolId?: string;

    /** Номер смены. */
    ShiftNumber: number = 0;

    /** Номер чека. */
    DocNumber: number = 0;

    /** Тип чека: 0 — текст, 1 — приход, 2 — возврат прихода, … 22 — открытие денежного ящика. */
    TaskType: number = 0;

    /** Фискальный признак документа. Заполняется только для фискальных документов. */
    FiscalSign?: string;

    /** Заголовок документа. */
    DocumentHeader?: DocumentHeader;

    /** Код результата обработки задания. */
    ResultCode: number = 0;

    /** Описание результата обработки задания. */
    ResultDescription?: string;
}