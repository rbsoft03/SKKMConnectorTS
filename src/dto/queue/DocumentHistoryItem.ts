/** Запись истории обработки документа. */
export class DocumentHistoryItem {
    /**Время события. */
    Time: string = "";
    /**Код состояния. */
    State: number = 0;
    /**Описание события. */
    Description: string = "";
    /**Дополнительная информация о событии. */
    Info: string = "";
}