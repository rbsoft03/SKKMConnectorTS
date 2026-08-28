/** Элемент списка отчётов. */
export class ShiftListItem {

    /** Результат обработки. */
    ResultCode: number = 0;

    /** Описание результата. */
    ResultDescription?: string;

    /** Дата создания документа. */
    Date: string = new Date().toISOString();

    /** Идентификатор документа. */
    DocId?: string;

    /** Номер сессии (смены). */
    ShiftNumber: number = 0;

    /** Имя устройства. */
    DeviceName?: string;

    /** Идентификатор терминала, с которого пришёл документ. */
    TerminalId?: string;
}