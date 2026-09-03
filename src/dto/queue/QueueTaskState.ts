import type { DocumentHistoryItem } from "./DocumentHistoryItem.js";

/** Состояние задания в очереди. */
export class QueueTaskState {
    /** */
    DeviceName: string = "";
    /** */
    DocId: string = "";
    /** */
    DocState: number = 0;
    /** */
    QueueState: number = 0;
    /** */
    ResultCode: number = 0;
    /** */
    ResultDescription: string = "";
    /** */
    NumberInQueue: number = 0;
    /** */
    Date: string = "";
    /** */
    FiscalSign: string = "";
    /** */
    PrintStatusDescription: string = "";
    /** */
    History: DocumentHistoryItem[] = [];
}