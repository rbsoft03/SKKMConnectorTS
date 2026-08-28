/** Данные о непереданных документах. */
export class Backlog {

    /** Количество непереданных документов. */
    DocumentsCounter: number = 0;

    /** Номер первого непереданного документа. */
    DocumentFirstNumber: number = 0;

    /** Дата и время первого из непереданных документов. */
    DocumentFirstDateTime: string = new Date().toISOString();
}