import type { CodeMarkInfo } from "./CodeMarkInfo.js";

/**Результат проверки кода маркировки. */
export class MarkingVerifyResult {
    /**Код результата проверки. */
    Code: number = 0;
    /**Описание результата проверки. */
    Description: string = "";
    /**Данные проверки кодов маркировки. */
    Codes: CodeMarkInfo[] = [];
    /**Идентификатор операции проверки. */
    ReqId: string = "";
    /**Временная метка операции проверки. */
    ReqTimestamp: number = 0;
    /**Признак офлайн-проверки. */
    IsCheckedOffline: boolean = false;
}