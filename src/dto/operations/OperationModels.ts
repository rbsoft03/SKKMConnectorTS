/** Краткая информация об операции. */
import { CheckDocument } from "../results/CheckDocument.js";
import { Device } from "../results/Device.js";

/** Краткая информация об операции. */
export class OperationListItem {
    DocId: string = "";
    BaseDocId: string = "";
    RequestId: string = "";
    TerminalId: string = "";
    DeviceName: string = "";
    PoolId: string = "";
    Date: string = "";
    CreatedAt: string = "";
    UpdateAt: string = "";
    TaskType: number = 0;
    TaskName: string = "";
    Sum: number = 0;
    SessionNumber: number = 0;
    DocNumberInShift: number = 0;
    DocNumber: number = 0;
    FnDate: string = "";
    FiscalSign: string = "";
    Fn: string = "";
    ClientContact: string = "";
    CashierName: string = "";
    RnKKT: string = "";
    ZnKKT: string = "";
    ResultCode: number = 0;
    ResultDescription: string = "";
    Processed: boolean = false;
}

/** Элемент истории операции. */
export class OperationHistoryItem {
    Time: string = "";
    State: number = 0;
    Description: string = "";
    Document?: CheckDocument;
}

/** Задача устройства. */
export class DeviceTaskInfo {
    TaskType: number = 0;
    DocId: string = "";
    Date: string = "";
    BaseDocId: string = "";
    RequestId: string = "";
    TerminalId: string = "";
    DeviceName: string = "";
    PoolId: string = "";
    ResultCode: number = 0;
    ResultDescription: string = "";
    Processed: boolean = false;
    ClientVersion: string = "";
    ServerVersion: string = "";
    DeviceInfo?: Device;
    Xml: string = "";
    SenderInfo?: SenderInfo;
}

/** Источник запроса операции. */
export class SenderInfo {
    AppName: string = "";
    AppVersion: string = "";
}

/** Строка журнала кодов маркировки операции. */
export class OperationKmRow {
    Cis: string = "";
    CheckedAt: string = "";
    PrintView: string = "";
    Message: string = "";
    CheckStatus: number = 0;
    PositionName: string = "";
    DocIds: string[] = [];
    SalePrice: number = 0;
    DeviceName: string = "";
    MarkId: string = "";
    KmVerificationMethod: number = 0;
    KmCheckInitiator: number = 0;
}