/** Элемент очереди печати. */
export class QueueItem {
    DocId: string = "";
    DeviceName: string = "";
    PoolId: string = "";
    SentToPrint: boolean = false;
    Time: string = "";
    PrintedTime: string = "";
    Printed: boolean = false;
    Sum: number = 0;
    ErrorDescription: string = "";
    Session: number = 0;
    DocNumber: number = 0;
}

/** Состояние задания в очереди. */
export class QueueTaskState {
    DeviceName: string = "";
    DocId: string = "";
    DocState: number = 0;
    QueueState: number = 0;
    ResultCode: number = 0;
    ResultDescription: string = "";
    NumberInQueue: number = 0;
    Date: string = "";
    FiscalSign: string = "";
    PrintStatusDescription: string = "";
    History: DocumentHistoryItem[] = [];
}

/** Запись истории обработки документа. */
export class DocumentHistoryItem {
    Time: string = "";
    State: number = 0;
    Description: string = "";
    Info: string = "";
}