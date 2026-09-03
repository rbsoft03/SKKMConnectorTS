import { Device } from "../results/Device.js";
import type { SenderInfo } from "./SenderInfo.js";

/** Информация о задаче устройства. */
export class DeviceTaskInfo {
    /**Тип задания.  */
    TaskType: number = 0;
    /**Идентификатор документа.  */
    DocId: string = "";
    /**Дата создания / выполнения операции. */
    Date: string = "";
    /**Идентификатор документа-основания.  */
    BaseDocId: string = "";
    /**Идентификатор запроса. */
    RequestId: string = "";
    /**Идентификатор терминала.  */
    TerminalId: string = "";
    /**Имя устройства.  */
    DeviceName: string = "";
    /**Идентификатор пула.  */
    PoolId: string = "";
    /**Код результата (0 — успех).  */
    ResultCode: number = 0;
    /**Описание результата.  */
    ResultDescription: string = "";
    /**Признак успешного завершения обработки.  */
    Processed: boolean = false;
    /**Версия клиента.  */
    ClientVersion: string = "";
    /**Версия сервера.  */
    ServerVersion: string = "";
    /**Сведения об устройстве, обработавшем задание.  */
    DeviceInfo?: Device;
    /**XML-представление документа.  */
    Xml: string = "";
    /**Сведения о приложении-источнике запроса.  */
    SenderInfo?: SenderInfo;
}