import { CheckDocument } from "../results/CheckDocument.js";

/**Элемент истории обработки операции. */
export class OperationHistoryItem {
    /**Время события.  */
    Time: string = "";
    /**Код состояния.  */
    State: number = 0;
    /**Описание события.  */
    Description: string = "";
    /**Состояние документа на этом шаге.  */
    Document?: CheckDocument;
}