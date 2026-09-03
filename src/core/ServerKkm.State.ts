import type { Constructor } from "./Constructor.js";
import { FiscalResult } from "../dto/results/FiscalResult.js";
import { DeviceListResponse } from "../dto/results/DeviceListResponse.js";
import { DataKkt } from "../dto/results/DataKkt.js";
import { KktStatus } from "../dto/results/KktStatus.js";
import { ResponseCurrentStatus } from "../dto/results/ResponseCurrentStatus.js";
import { ResShiftTotal } from "../dto/results/ResShiftTotal.js";
import { Picture } from "../dto/results/Picture.js";
import { RequestKmResult } from "../dto/results/RequestKmResult.js";
import { ProcessingKmResult } from "../dto/results/ProcessingKmResult.js";
import { CheckDocument } from "../dto/results/CheckDocument.js";
import { ResponseTaskStatus } from "../dto/results/ResponseTaskStatus.js";
import { PrintFormLine } from "../dto/results/PrintFormLine.js";
import { ShiftListItem } from "../dto/results/ShiftListItem.js";
import { UserToken } from "../dto/admin/UserToken.js";
import { ServiceUser } from "../dto/admin/ServiceUser.js";
import { ServiceSettings } from "../dto/admin/ServiceSettings.js";
import { QueueTaskState } from "../dto/queue/QueueTaskState.js";
import { QueueItem } from "../dto/queue/QueueItem.js";

import { DeviceTaskInfo } from "../dto/operations/DeviceTaskInfo.js";
import { OperationHistoryItem } from "../dto/operations/OperationHistoryItem.js";
import { OperationKmRow } from "../dto/operations/OperationKmRow.js";
import { OperationListItem } from "../dto/operations/OperationListItem.js";

import { PrintTemplate } from "../dto/templates/PrintTemplate.js";
import { CheckTemplate } from "../dto/templates/CheckTemplate.js";
import { CheckTemplateListItem } from "../dto/templates/CheckTemplateListItem.js";
import { FiscalizationDocument } from "../dto/fiscalization/FiscalizationDocument.js";
import { MarkingVerifyResult } from "../dto/marking/MarkingVerifyResult.js";

/**Свойства-результаты последнего вызова.*/
export function WithState<TBase extends Constructor>(Base: TBase) {
    return class extends Base {

        /** Успех последнего вызова. Ответ каждого метода. */
        Ok = false;

        /** Код ошибки сервера. Ответ. 0 - нет ошибки. */
        ErrorCode = 0;

        /** Текст ошибки сервера. Ответ. При успехе «OK» или пусто. */
        ErrorDescription = "";

        /** Поле Result последнего ответа сервера (документы, статусы задач). */
        LastResult: unknown = undefined;

        /**
         * Фискальные поля ответа (чек, коррекция, смена): ФП, номер ФД, смена, DocId.
         * Из него обновляются FiscalSign, CheckNumber, ShiftNumber.
         */
        FiscalResult: FiscalResult | undefined = undefined;

        /** Список устройств после GetDeviceList. */
        Devices: DeviceListResponse[] = [];

        /** Данные кассы после Connect. */
        Kkt: DataKkt | undefined = undefined;

        /** Состояние ККМ после GetStatus / Connect. */
        Status: KktStatus | undefined = undefined;

        /** Статус смены после GetShiftStatus. */
        ShiftStatus: ResponseCurrentStatus | undefined = undefined;

        /** Итоги смены после GetTotals. */
        ShiftTotals: ResShiftTotal | undefined = undefined;

        /** Остаток наличных после GetCash. */
        CashBalance = 0;

        /** Список картинок после GetPictureList. */
        Pictures: Picture[] = [];

        /** Ширина строки чека в символах (GetLineLength / GetStatus / Connect). */
        LineLength = 0;

        /** Ширина печатной области в пикселях после GetLineLength. */
        LineLengthPixels = 0;

        /** Необнуляемая сумма продаж после GetOverAll. */
        NonZeroSum = 0;

        /** Результат локальной проверки КМ после RequestKM. */
        MarkingCheck: RequestKmResult | undefined = undefined;

        /** Результат проверки КМ в ОИСМ после GetProcessingKMResult. */
        MarkingProcessing: ProcessingKmResult | undefined = undefined;

        /**
         * Документ после GetCheck / GetCorrection120 / GetCorrection105 / GetReportX / GetReportZ /
         * GetOpenShift / GetReportSettlement / GetCashIn / GetCashOut.
         */
        Check: CheckDocument | undefined = undefined;

        /** Список документов после GetChecksByShift / GetCorrection120List / GetCorrection105List / GetCashInList. */
        Checks: CheckDocument[] = [];

        /** Статус задания после GetTaskStatus. */
        TaskStatus: ResponseTaskStatus | undefined = undefined;

        /** Печатная форма после GetPrintForm. */
        PrintForm: PrintFormLine[] = [];

        /** Список отчётов после GetShiftList / GetOpenShiftList / GetReportXList / GetReportSettlementList. */
        Shifts: ShiftListItem[] = [];

        /** Версия сервера. */
        ServerVersion = "";

        /** Токен пользователя. */
        UserToken: UserToken | undefined = undefined;

        /** Список пользователей. */
        Users: ServiceUser[] = [];

        /** Настройки службы. */
        ServiceSettingsResult: ServiceSettings | undefined = undefined;

        /** Список пулов. */
        Pools: string[] = [];

        /** Очередь печати. */
        Queue: QueueItem[] = [];

        /** Состояние задания очереди. */
        QueueTask: QueueTaskState | undefined = undefined;

        /** Операция. */
        Operation: DeviceTaskInfo | undefined = undefined;

        /** История операции. */
        OperationHistory: OperationHistoryItem[] = [];

        /** TLV операции. */
        OperationTlv = "";

        /** Коды маркировки операции. */
        OperationKm: OperationKmRow[] = [];

        /** Связанные операции. */
        RelatedOperations: DeviceTaskInfo[] = [];

        /** Список операций. */
        Operations: OperationListItem[] = [];

        /** Шаблон печати. */
        PrintTemplate: PrintTemplate | undefined = undefined;

        /** Список шаблонов печати. */
        Templates: PrintTemplate[] = [];

        /** Шаблон чека. */
        CheckTemplate: CheckTemplate | undefined = undefined;

        /** Список шаблонов чека. */
        CheckTemplates: CheckTemplateListItem[] = [];

        /** Документ фискализации. */
        FiscalizationDocument: FiscalizationDocument | undefined = undefined;

        /** Список фискализаций. */
        Fiscalizations: FiscalizationDocument[] = [];

        /** Результат проверки маркировки. */
        MarkingVerify: MarkingVerifyResult | undefined = undefined;

        /** Картинка в Base64. */
        PictureBase64Result = "";
    };
}