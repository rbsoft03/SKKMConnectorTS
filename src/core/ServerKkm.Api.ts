import type { Constructor } from "./Constructor.js";
import { CheckbaseParameters } from "../data/contracts/CheckbaseParameters.js";
import { OverallTotals } from "../data/contracts/OverallTotals.js";
import { LineLengthV2 } from "../data/contracts/LineLengthV2.js";
import { CashSum } from "../data/contracts/CashSum.js";
import { UploadPicture } from "../data/contracts/UploadPicture.js";
import { RequestKmParameters } from "../data/contracts/RequestKmParameters.js";
import { RequestKm } from "../data/contracts/RequestKm.js";
import { RequestConfirmKm } from "../data/contracts/RequestConfirmKm.js";
import { CheckParameters } from "../data/contracts/CheckParameters.js";
import { Correction120Parameters } from "../data/contracts/Correction120Parameters.js";
import { Correction105Parameters } from "../data/contracts/Correction105Parameters.js";
import { DocumentParameters } from "../data/contracts/DocumentParameters.js";
import { CashdrawParameters } from "../data/contracts/CashdrawParameters.js";
import { ShiftState } from "../dto/enums/ShiftState.js";
import { Warnings } from "../dto/results/Warnings.js";
import {
    DeviceSettingsRequest,
    ServiceSettingsRequest,
    UserProfileRequest,
    DeviceFontSettingsRequest,
    CheckTemplateRequest,
    CheckCopyFnParameters,
    MarkingCodesRequest,
} from "../data/contracts/AdminContracts.js";

import { DeviceListResponse } from "../dto/results/DeviceListResponse.js";
import { DataKkt } from "../dto/results/DataKkt.js";
import { KktStatus } from "../dto/results/KktStatus.js";
import { ResponseCurrentStatus } from "../dto/results/ResponseCurrentStatus.js";
import { ResShiftTotal } from "../dto/results/ResShiftTotal.js";
import { CheckDocument } from "../dto/results/CheckDocument.js";
import { ResponseTaskStatus } from "../dto/results/ResponseTaskStatus.js";
import { PrintFormLine } from "../dto/results/PrintFormLine.js";
import { Picture } from "../dto/results/Picture.js";
import { RequestKmResult } from "../dto/results/RequestKmResult.js";
import { ProcessingKmResult } from "../dto/results/ProcessingKmResult.js";
import { ShiftListItem } from "../dto/results/ShiftListItem.js";
import { FiscalResult } from "../dto/results/FiscalResult.js";
import { Payments } from "../dto/Payments.js";
import { CheckType } from "../dto/enums/CheckType.js";
import { TaxSystem } from "../dto/enums/TaxSystem.js";
import { UserToken } from "../dto/admin/UserToken.js";
import { ServiceUser } from "../dto/admin/ServiceUser.js";
import { ServiceSettings } from "../dto/admin/ServiceSettings.js";
import { DeviceSettings } from "../dto/admin/DeviceSettings.js";
import { QueueItem } from "../dto/queue/QueueItem.js";
import { QueueTaskState } from "../dto/queue/QueueTaskState.js";
import { DeviceTaskInfo } from "../dto/operations/DeviceTaskInfo.js";
import { OperationHistoryItem } from "../dto/operations/OperationHistoryItem.js";
import { OperationKmRow } from "../dto/operations/OperationKmRow.js";
import { OperationListItem } from "../dto/operations/OperationListItem.js";

import { PrintTemplate } from "../dto/templates/PrintTemplate.js";
import { TemplateParameters } from "../dto/templates/TemplateParameters.js";
import { CheckTemplate } from "../dto/templates/CheckTemplate.js";
import { CheckTemplateListItem } from "../dto/templates/CheckTemplateListItem.js";
import { CheckTemplateParameters } from "../dto/templates/CheckTemplateParameters.js";
import { FiscalizationDocument } from "../dto/fiscalization/FiscalizationDocument.js";
import { FiscalizationParameters } from "../dto/fiscalization/FiscalizationParameters.js";
import { FiscalizationRequest } from "../data/contracts/FiscalizationRequest.js";
import { MarkingVerifyResult } from "../dto/marking/MarkingVerifyResult.js";

/**
 * Минимальный набор членов, которые Api ожидает от TBase — практически
 * всё, что есть в State/Connection/CheckInput, плюс методы Internals/Requests.
 */
interface ApiRequirements {
    get(path: string, useBasicAuth?: boolean): Promise<void>;
    post(path: string, body?: object): Promise<void>;
    put(path: string, body?: object): Promise<void>;
    delete(path: string): Promise<void>;
    getDocumentById(path: string): Promise<void>;
    getCheckList(path: string): Promise<void>;
    getReportList(path: string, extraQuery?: string): Promise<void>;
    readResult<T>(): T | undefined;
    readTemplateList(): PrintTemplate[];
    applyOperation(operation: DeviceTaskInfo | undefined): void;
    readonly deviceQuery: string;
    readonly idQuery: string;
    readonly docIdQuery: string;

    checkBase(): CheckbaseParameters;
    checkBody(): CheckParameters;
    correction120Body(): Correction120Parameters;
    correction105Body(): Correction105Parameters;
    slipBody(): DocumentParameters;
    cashBody(): CashdrawParameters;
    checkTemplateBody(): CheckTemplateRequest;
    fillBase(check: CheckbaseParameters): void;

    DeviceName: string;
    Token: string;
    SaleLocation: string;
    PaymentType: number;
    TaxVariant: number;
    Electronically: boolean;
    OperationOnline: boolean;
    TimeZone: number | undefined;
    TextBefore: string;
    TextAfter: string;
    SaleAddress: string;
    SenderEmail: string;
    AdditionalAttribute: string;
    IndustryAttribute: unknown;
    UserAttribute: unknown;
    OperationalAttribute: unknown;
    ElectronicPayments: unknown[];
    AgentSign: number | undefined;
    Agent: unknown;
    Vendor: unknown;
    Customer: unknown;
    Payments: Payments;
    Positions: unknown[];
    CorrectionData: unknown;
    Correction105Taxes: unknown;
    CashAmount: number;
    TextForPrint: string;
    PictureName: string;
    PictureBase64: string;
    PictureAlignment: number;
    MarkingCode: string;
    PlannedStatus: number;
    MarkingQuantity: number;
    MeasureOfQuantity: number;
    FractionalQuantityNumerator: number;
    FractionalQuantityDenominator: number;
    NotSendToServer: boolean;
    WaitForResult: boolean;
    RequestKmGuid: string;
    ConfirmationType: number;
    ShiftsFrom: string;
    ShiftsTo: string;
    DocumentId: string;
    FiscalSign: string;
    ShiftNumber: number;
    CheckNumber: number;
    CheckNumberInShift: number;
    RnNumber: string;
    FnsUrl: string;
    ServerDateTime: string;
    FiscalDateTime: string;
    DeviceDateTime: string;
    CurrentShiftState: ShiftState | undefined;
    BacklogDocumentsCount: number;
    BacklogFirstDocumentNumber: number;
    BacklogFirstDocumentDateTime: string | undefined;
    FnValidityDate: string;
    FnDaysResources: number;
    IsFnPresent: boolean;
    IsFiscal: boolean;
    FnWarnings: Warnings | undefined;
    IsProcessed: boolean;
    Ok: boolean;
    ErrorCode: number;
    ErrorDescription: string;
    LastResult: unknown;
    FiscalResult: FiscalResult | undefined;
    Devices: DeviceListResponse[];
    Kkt: DataKkt | undefined;
    Status: KktStatus | undefined;
    ShiftStatus: ResponseCurrentStatus | undefined;
    ShiftTotals: ResShiftTotal | undefined;
    CashBalance: number;
    Pictures: Picture[];
    LineLength: number;
    LineLengthPixels: number;
    NonZeroSum: number;
    MarkingCheck: RequestKmResult | undefined;
    MarkingProcessing: ProcessingKmResult | undefined;
    Check: CheckDocument | undefined;
    Checks: CheckDocument[];
    TaskStatus: ResponseTaskStatus | undefined;
    PrintForm: PrintFormLine[];
    Shifts: ShiftListItem[];
    AuthUserName: string;
    AuthPassword: string;
    PoolName: string;
    ReportType: number;
    QueueTaskId: string;
    PictureId: string;
    TemplateName: string;
    UserId: string;
    FnNumber: string;
    MarkingCodes: string[];
    DeviceSettings: DeviceSettings | undefined;
    ServiceSettings: ServiceSettings | undefined;
    ServiceUser: ServiceUser | undefined;
    TemplateParameters: TemplateParameters | undefined;
    CheckTemplateParameters: CheckTemplateParameters | undefined;
    FiscalizationParameters: FiscalizationParameters | undefined;
    ServerVersion: string;
    UserToken: UserToken | undefined;
    Users: ServiceUser[];
    ServiceSettingsResult: ServiceSettings | undefined;
    Pools: string[];
    Queue: QueueItem[];
    QueueTask: QueueTaskState | undefined;
    Operation: DeviceTaskInfo | undefined;
    OperationHistory: OperationHistoryItem[];
    OperationTlv: string;
    OperationKm: OperationKmRow[];
    RelatedOperations: DeviceTaskInfo[];
    Operations: OperationListItem[];
    PrintTemplate: PrintTemplate | undefined;
    Templates: PrintTemplate[];
    CheckTemplate: CheckTemplate | undefined;
    CheckTemplates: CheckTemplateListItem[];
    FiscalizationDocument: FiscalizationDocument | undefined;
    Fiscalizations: FiscalizationDocument[];
    MarkingVerify: MarkingVerifyResult | undefined;
    PictureBase64Result: string;
}

export function WithApi<TBase extends Constructor<ApiRequirements>>(Base: TBase) {
    return class extends Base {
        /** Очистка входных данных перед новым запросом и результаты прошлого вызова. */
        NewRequest(): void {
            this.PaymentType = CheckType.Sale;
            this.IsProcessed = false;
            this.TaxVariant = TaxSystem.ОСН;
            this.Electronically = false;
            this.OperationOnline = false;
            this.TimeZone = undefined;
            this.TextBefore = "";
            this.TextAfter = "";
            this.SaleLocation = "";
            this.SaleAddress = "";
            this.SenderEmail = "";
            this.AdditionalAttribute = "";
            this.IndustryAttribute = undefined;
            this.UserAttribute = undefined;
            this.OperationalAttribute = undefined;
            this.ElectronicPayments.length = 0;
            this.AgentSign = undefined;
            this.Agent = undefined;
            this.Vendor = undefined;
            this.Customer = undefined;
            this.Payments = new Payments();
            this.Positions.length = 0;
            this.CorrectionData = undefined;
            this.Correction105Taxes = undefined;
            this.CashAmount = 0;
            this.TextForPrint = "";
            this.PictureName = "";
            this.PictureBase64 = "";
            this.PictureAlignment = 2;
            this.MarkingCode = "";
            this.PlannedStatus = 1;
            this.MarkingQuantity = 1;
            this.MeasureOfQuantity = 0;
            this.FractionalQuantityNumerator = 0;
            this.FractionalQuantityDenominator = 0;
            this.NotSendToServer = false;
            this.WaitForResult = false;
            this.RequestKmGuid = "";
            this.ConfirmationType = 0;
            const today = new Date();
            const from = new Date(today);
            from.setDate(from.getDate() - 7);
            this.ShiftsFrom = from.toISOString().slice(0, 10);
            this.ShiftsTo = today.toISOString().slice(0, 10);
            this.DocumentId = "";
            this.FiscalSign = "";
            this.ShiftNumber = 0;
            this.CheckNumber = 0;
            this.CheckNumberInShift = 0;
            this.RnNumber = "";
            this.FnsUrl = "";
            this.ServerDateTime = "";
            this.FiscalDateTime = "";
            this.DeviceDateTime = "";
            this.CurrentShiftState = undefined;
            this.BacklogDocumentsCount = 0;
            this.BacklogFirstDocumentNumber = 0;
            this.BacklogFirstDocumentDateTime = undefined;
            this.FnValidityDate = "";
            this.FnDaysResources = 0;
            this.IsFnPresent = false;
            this.IsFiscal = false;
            this.FnWarnings = undefined;
            this.FnNumber = "";
            this.CashBalance = 0;
            this.ShiftTotals = undefined;
            this.NonZeroSum = 0;
            this.Ok = false;
            this.ErrorCode = 0;
            this.ErrorDescription = "";
            this.LastResult = undefined;
            this.FiscalResult = undefined;
            this.MarkingCheck = undefined;
            this.MarkingProcessing = undefined;
            this.Check = undefined;
            this.Checks = [];
            this.TaskStatus = undefined;
            this.PrintForm = [];
            this.Shifts = [];
        }

        /** Проверка доступности сервера ККМ. */
        async Ping(): Promise<void> {
            await this.get("ping");
        }

        /** Получение списка зарегистрированных ККТ. */
        async GetDeviceList(): Promise<void> {
            await this.get("kkt/list");
            this.Devices = this.readResult<DeviceListResponse[]>() ?? [];
        }

        /** Получение подробной информации об устройстве ККТ. */
        async Connect(): Promise<void> {
            await this.get(`kkt?${this.deviceQuery}`);
            this.Kkt = this.readResult<DataKkt>();
            if (this.Kkt?.Status !== undefined) this.Status = this.Kkt.Status;
            if (this.Kkt?.Device !== undefined) {
                this.LineLength = this.Kkt.Device.LineLength;
            } else if (this.Kkt?.Status !== undefined) {
                this.LineLength = this.Kkt.Status.LineLength;
            }
            if (this.Kkt?.Fn?.SaleLocation) {
                this.SaleLocation = this.Kkt.Fn.SaleLocation;
            }
        }

        /** Получение расширенного статуса ККТ. */
        async GetStatus(): Promise<void> {
            await this.get(`kkt/status?${this.deviceQuery}`);
            this.Status = this.readResult<KktStatus>();
            if (this.Status === undefined) return;
            this.LineLength = this.Status.LineLength;
            this.ShiftNumber = this.Status.ShiftNumber;
            this.CheckNumber = this.Status.DocNumber;
        }

        /** Получение краткого статуса смены и очереди ОФД. */
        async GetShiftStatus(): Promise<void> {
            await this.get(`kkt/shift/status?${this.deviceQuery}`);
            this.ShiftStatus = this.readResult<ResponseCurrentStatus>();
            if (this.ShiftStatus === undefined) return;
            this.ShiftNumber = this.ShiftStatus.ShiftNumber;
            this.CheckNumber = this.ShiftStatus.CheckNumber;
        }

        /** Открытие кассовой смены. */
        async OpenShift(): Promise<void> {
            await this.post("shift/open", this.checkBase());
        }

        /** Закрытие кассовой смены (Z-отчёт). */
        async CloseShift(): Promise<void> {
            await this.post("shift/z", this.checkBase());
        }

        /** Формирование X-отчёта (без закрытия смены). */
        async ReportX(): Promise<void> {
            await this.post("shift/x", this.checkBase());
        }

        /** Формирование отчёта о текущем состоянии расчётов. */
        async ReportSettlement(): Promise<void> {
            await this.post("report/settlement", this.checkBase());
        }

        /** Возвращает X-отчёт по идентификатору документа (docId). */
        async GetReportX(): Promise<void> {
            await this.getDocumentById("shift/x");
        }

        /** Возвращает Z-отчёт по идентификатору документа (docId). */
        async GetReportZ(): Promise<void> {
            await this.getDocumentById("shift/z");
        }

        /** Возвращает результат открытия смены по идентификатору документа (docId). */
        async GetOpenShift(): Promise<void> {
            await this.getDocumentById("shift/open");
        }

        /** Возвращает отчёт о состоянии расчётов по идентификатору документа (docId). */
        async GetReportSettlement(): Promise<void> {
            await this.getDocumentById("report/settlement");
        }

        /** Получение необнуляемых (накопительных) счётчиков ККТ. */
        async GetOverAll(): Promise<void> {
            await this.get(`kkt/counters/overall?${this.deviceQuery}`);
            this.NonZeroSum = this.readResult<OverallTotals>()?.Counters?.Sales?.Sum ?? 0;
        }

        /** Получение максимальной ширины строки чека устройства. */
        async GetLineLength(): Promise<void> {
            await this.get(`kkt/lineLength?${this.deviceQuery}`);
            const length = this.readResult<LineLengthV2>();
            if (length === undefined) return;
            this.LineLength = length.LineLength;
            this.LineLengthPixels = length.LineLengthPixels;
        }

        /** Получение счётчиков за смену. */
        async GetTotals(): Promise<void> {
            await this.get(`kkt/counters/shift?${this.deviceQuery}`);
            this.ShiftTotals = this.readResult<ResShiftTotal>();
        }

        /** Получение списка Z-отчётов за период. */
        async GetShiftList(): Promise<void> {
            const extra = this.ReportType > 0 ? `reportType=${this.ReportType}` : undefined;
            await this.getReportList("shift/z/list", extra);
        }

        /** Получение списка открытий смен за период. */
        async GetOpenShiftList(): Promise<void> {
            await this.getReportList("shift/open/list");
        }

        /** Получение списка X-отчётов за период. */
        async GetReportXList(): Promise<void> {
            await this.getReportList("shift/x/list");
        }

        /** Список отчётов о состоянии расчётов по устройству за период. */
        async GetReportSettlementList(): Promise<void> {
            await this.getReportList("report/settlement/list");
        }

        /** Печать кассового чека. */
        async PrintCheck(): Promise<void> {
            await this.post("check", this.checkBody());
        }

        /** Асинхронно поставить фискальный чек в очередь печати. */
        async PrintCheckAsync(): Promise<void> {
            await this.post("check/async", this.checkBody());
        }

        /** Печать чека коррекции для ФФД 1.2. */
        async PrintCheckCorrection120(): Promise<void> {
            await this.post("correction120", this.correction120Body());
        }

        /** Асинхронно печатает чек коррекции для ФФД 1.2. */
        async PrintCheckCorrection120Async(): Promise<void> {
            await this.post("correction120/async", this.correction120Body());
        }

        /** Печать чека коррекции для ФФД 1.0.5. */
        async PrintCheckCorrection105(): Promise<void> {
            await this.post("correction105", this.correction105Body());
        }

        /** Асинхронно ставит печать чека коррекции для ФФД 1.0.5. */
        async PrintCheckCorrection105Async(): Promise<void> {
            await this.post("correction105/async", this.correction105Body());
        }

        /** Возвращает чек коррекции ФФД 1.2 по идентификатору документа (docId). */
        async GetCorrection120(): Promise<void> {
            await this.getDocumentById("correction120");
        }

        /** Получение списка чеков коррекции ФФД 1.2. */
        async GetCorrection120List(): Promise<void> {
            await this.getCheckList("correction120/list");
        }

        /** Возвращает чек коррекции ФФД 1.0.5 по идентификатору документа (docId). */
        async GetCorrection105(): Promise<void> {
            await this.getDocumentById("correction105");
        }

        /** Получение списка чеков коррекции ФФД 1.0.5. */
        async GetCorrection105List(): Promise<void> {
            await this.getCheckList("correction105/list");
        }

        /** Получение списка чеков за смену. */
        async GetChecksByShift(): Promise<void> {
            await this.get(`check/list?${this.deviceQuery}&shift=${this.ShiftNumber}`);
            this.Checks = this.readResult<CheckDocument[]>() ?? [];
        }

        /** Возвращает статус выполнения задания по идентификатору документа (docId). */
        async GetTaskStatus(): Promise<void> {
            await this.get(`task/status?${this.idQuery}`);
            this.TaskStatus = this.readResult<ResponseTaskStatus>();
            if (this.TaskStatus === undefined) return;
            if (this.TaskStatus.FiscalSign) this.FiscalSign = this.TaskStatus.FiscalSign;
            if (this.TaskStatus.DocNumber > 0) this.CheckNumber = this.TaskStatus.DocNumber;
            if (this.TaskStatus.ShiftNumber > 0) this.ShiftNumber = this.TaskStatus.ShiftNumber;
            if (this.TaskStatus.DocId) this.DocumentId = this.TaskStatus.DocId;
        }

        /** Возвращает результат операции по идентификатору документа (docId). */
        async GetCheck(): Promise<void> {
            await this.getDocumentById("check");
        }

        /** Получение фискального признака (ФП) по номеру фискального документа (ФД). */
        async GetFiscalSign(): Promise<void> {
            await this.get(`check/fiscalSign?docNumber=${this.CheckNumber}&${this.deviceQuery}`);
            if (this.Ok && typeof this.LastResult === "string") {
                this.FiscalSign = this.LastResult;
            }
        }

        /** Печать копии чека. */
        async PrintCheckCopy(): Promise<void> {
            if (!this.DocumentId || this.DocumentId.trim().length === 0) {
                await this.post(`check/copy/last?${this.deviceQuery}`);
            } else {
                const body = new CheckbaseParameters();
                body.DeviceName = this.DeviceName;
                body.DocId = this.DocumentId;
                await this.post("check/copy", body);
            }
        }

        /** Возвращает печатную форму документа по его идентификатору (docId). */
        async GetPrintForm(): Promise<void> {
            await this.get(`task/form?${this.idQuery}`);
            this.PrintForm = this.readResult<PrintFormLine[]>() ?? [];
        }

        /** Регистрация операции внесения наличных в денежный ящик. */
        async CashIn(): Promise<void> {
            await this.post("cashin", this.cashBody());
        }

        /** Регистрация операции выемки наличных из денежного ящика. */
        async CashOut(): Promise<void> {
            await this.post("cashout", this.cashBody());
        }

        /** Открытие денежного ящика. */
        async OpenCashdrawer(): Promise<void> {
            await this.post("cash/open", this.checkBase());
        }

        /** Получение остатка наличных в денежном ящике. */
        async GetCash(): Promise<void> {
            await this.get(`cash?${this.deviceQuery}`);
            this.CashBalance = this.readResult<CashSum>()?.Sum ?? 0;
        }

        /** Возвращает результат операции внесения наличных по идентификатору операции (docId). */
        async GetCashIn(): Promise<void> {
            await this.getDocumentById("cashin");
        }

        /** Получение списка операций внесения наличных по имени устройства. */
        async GetCashInList(): Promise<void> {
            await this.getCheckList("cashin/list");
        }

        /** Возвращает результат операции выемки наличных по идентификатору операции (docId). */
        async GetCashOut(): Promise<void> {
            await this.getDocumentById("cashout");
        }

        /** Загрузка изображения в выбранную ККТ. */
        async SendPicture(): Promise<void> {
            const body = new UploadPicture();
            body.DeviceName = this.DeviceName;
            body.PictureName = this.PictureName;
            body.Base64 = this.PictureBase64;
            body.Alignment = this.PictureAlignment;
            await this.post("picture", body);
        }

        /** Получение списка изображений. */
        async GetPictureList(): Promise<void> {
            await this.get(`picture/list?${this.deviceQuery}`);
            this.Pictures = this.readResult<Picture[]>() ?? [];
        }

        /** Открытие сессии регистрации (проверки) кодов маркировки на ККТ. */
        async OpenSessionRegistrationKM(): Promise<void> {
            const body = new CheckbaseParameters();
            body.DeviceName = this.DeviceName;
            await this.post("marking/session/open", body);
        }

        /** Закрытие сессии регистрации (проверки) кодов маркировки на ККТ. */
        async CloseSessionRegistrationKM(): Promise<void> {
            const body = new CheckbaseParameters();
            body.DeviceName = this.DeviceName;
            await this.post("marking/session/close", body);
        }

        /** Локальная проверка кода маркировки на ККТ (ФФД 1.2). */
        async RequestKM(): Promise<void> {
            if (!this.RequestKmGuid || this.RequestKmGuid.trim().length === 0) {
                this.RequestKmGuid = crypto.randomUUID();
            }

            const requestKm = new RequestKm();
            requestKm.Guid = this.RequestKmGuid;
            requestKm.NotSendToServer = this.NotSendToServer;
            requestKm.WaitForResult = this.WaitForResult;
            requestKm.MarkingCode = this.MarkingCode;
            requestKm.PlannedStatus = this.PlannedStatus;
            requestKm.Quantity = this.MarkingQuantity;
            requestKm.MeasureOfQuantity = this.MeasureOfQuantity;
            if (this.FractionalQuantityNumerator > 0) {
                requestKm.FractionalQuantityNumerator = this.FractionalQuantityNumerator;
            }
            if (this.FractionalQuantityDenominator > 0) {
                requestKm.FractionalQuantityDenominator = this.FractionalQuantityDenominator;
            }

            const body = new RequestKmParameters();
            body.DeviceName = this.DeviceName;
            body.RequestKM = requestKm;

            await this.post("marking/km/request", body);
            this.MarkingCheck = this.readResult<RequestKmResult>();
        }

        /** Получение результата проверки кода маркировки в ОИСМ. */
        async GetProcessingKMResult(): Promise<void> {
            await this.get(`marking/km/result?${this.deviceQuery}`);
            this.MarkingProcessing = this.readResult<ProcessingKmResult>();
            if (this.MarkingProcessing?.Guid) {
                this.RequestKmGuid = this.MarkingProcessing.Guid;
            }
        }

        /**
         * Подтверждение, будет ли ранее проверенный код маркировки фактически включён в
         * документ реализации. Действительно только в рамках открытой сессии регистрации.
         */
        async ConfirmKM(): Promise<void> {
            const body = new RequestConfirmKm();
            body.DeviceName = this.DeviceName;
            body.GUID = this.RequestKmGuid;
            body.ConfirmationType = this.ConfirmationType;
            await this.post("marking/km/confirm", body);
        }

        /** Печать нефискального документа. */
        async PrintSlip(): Promise<void> {
            await this.post("slip", this.slipBody());
        }

        /** Асинхронно поставить нефискальный документ в очередь печати. */
        async PrintSlipAsync(): Promise<void> {
            await this.post("slip/async", this.slipBody());
        }

        // ===== Админ-API =====

        /** Версия сервера ККМ. */
        async GetVersion(): Promise<void> {
            await this.get("version");
            if (typeof this.LastResult === "string") {
                this.ServerVersion = this.LastResult;
            } else if (this.LastResult !== undefined) {
                this.ServerVersion = String(this.LastResult);
            }
        }

        /**
         * Получение токена авторизации по логину и паролю.
         * Нужны AuthUserName и AuthPassword (по умолчанию Admin / Admin).
         */
        async GetUserToken(): Promise<void> {
            if (!this.AuthUserName?.trim() || !this.AuthPassword?.trim()) {
                this.Ok = false;
                this.ErrorCode = -1;
                this.ErrorDescription = "Укажите AuthUserName и AuthPassword для получения токена.";
                return;
            }

            await this.get("user/token", true);
            this.UserToken = this.readResult<UserToken>();
            if (this.UserToken?.tokenId) {
                this.Token = this.UserToken.tokenId;
            }
        }

        /** Список пользователей сервера ККМ. */
        async GetUserList(): Promise<void> {
            await this.get("user/list");
            this.Users = this.readResult<ServiceUser[]>() ?? [];
        }

        /** Добавление пользователя. */
        async AddUser(): Promise<void> {
            const body = new UserProfileRequest();
            if (this.ServiceUser !== undefined) body.User = this.ServiceUser;
            await this.post("user", body);
        }

        /** Изменение пользователя. */
        async UpdateUser(): Promise<void> {
            await this.put(`user?id=${encodeURIComponent(this.UserId)}`, this.ServiceUser);
        }

        /** Удаление пользователя. */
        async DeleteUser(): Promise<void> {
            await this.delete(`user?id=${encodeURIComponent(this.UserId)}`);
        }

        /** Получение настроек службы печати. */
        async GetServiceSettings(): Promise<void> {
            await this.get("service/settings");
            this.ServiceSettingsResult = this.readResult<ServiceSettings>();
        }

        /** Сохранение настроек службы печати. */
        async SaveServiceSettings(): Promise<void> {
            const body = new ServiceSettingsRequest();
            if (this.ServiceSettings !== undefined) body.ServiceSettings = this.ServiceSettings;
            await this.post("service/settings", body);
        }

        /** Добавление кассы на сервер. */
        async AddDevice(): Promise<void> {
            const settings = this.DeviceSettings ?? new DeviceSettings();
            if (!settings.DeviceName?.trim()) settings.DeviceName = this.DeviceName;
            const body = new DeviceSettingsRequest();
            body.DeviceName = settings.DeviceName;
            body.Settings = settings;
            await this.post("kkt", body);
        }

        /** Изменение настроек кассы. */
        async UpdateDevice(): Promise<void> {
            const settings = this.DeviceSettings ?? new DeviceSettings();
            if (!settings.DeviceName?.trim()) settings.DeviceName = this.DeviceName;
            const body = new DeviceSettingsRequest();
            body.DeviceName = settings.DeviceName;
            body.Settings = settings;
            await this.put("kkt", body);
        }

        /** Удаление кассы с сервера. */
        async DeleteDevice(): Promise<void> {
            await this.delete(`kkt?device=${encodeURIComponent(this.DeviceName)}`);
        }

        /** Перезагрузка кассы. */
        async RebootDevice(): Promise<void> {
            await this.post("kkt/reboot", this.checkBase());
        }

        /** Настройка шрифтов шаблона кассы. */
        async SetDeviceFont(): Promise<void> {
            const settings = this.DeviceSettings;
            const body = new DeviceFontSettingsRequest();
            body.DeviceName = this.DeviceName;
            if (settings?.TemplateSettingH1) body.TemplateSettingH1 = settings.TemplateSettingH1;
            if (settings?.TemplateSettingH2) body.TemplateSettingH2 = settings.TemplateSettingH2;
            if (settings?.TemplateSettingH3) body.TemplateSettingH3 = settings.TemplateSettingH3;
            if (settings?.TemplateSettingH4) body.TemplateSettingH4 = settings.TemplateSettingH4;
            if (settings?.TemplateSettingH5) body.TemplateSettingH5 = settings.TemplateSettingH5;
            await this.post("kkt/font/setting", body);
        }

        /** Список пулов устройств. */
        async GetPoolList(): Promise<void> {
            await this.get("pool/list");
            this.Pools = this.readResult<string[]>() ?? [];
        }

        /** Список касс в пуле. */
        async GetDeviceListByPool(): Promise<void> {
            await this.get(`kkt/list/byPool?pool=${encodeURIComponent(this.PoolName)}`);
            this.Devices = this.readResult<DeviceListResponse[]>() ?? [];
        }

        // ===== Асинхронные операции со сменой =====

        /** Асинхронное открытие смены. */
        async OpenShiftAsync(): Promise<void> {
            await this.post("shift/open/async", this.checkBase());
        }

        /** Асинхронное закрытие смены. */
        async CloseShiftAsync(): Promise<void> {
            await this.post("shift/z/async", this.checkBase());
        }

        /** Асинхронный X-отчёт. */
        async ReportXAsync(): Promise<void> {
            await this.post("shift/x/async", this.checkBase());
        }

        /** Асинхронный отчёт о состоянии расчётов. */
        async ReportSettlementAsync(): Promise<void> {
            await this.post("report/settlement/async", this.checkBase());
        }

        /** Асинхронное внесение наличных. */
        async CashInAsync(): Promise<void> {
            await this.post("cashin/async", this.cashBody());
        }

        /** Асинхронная выемка наличных. */
        async CashOutAsync(): Promise<void> {
            await this.post("cashout/async", this.cashBody());
        }

        // ===== Чеки, слипы, картинки =====

        /** Список чеков за период или смену. */
        async GetCheckList(): Promise<void> {
            let query = `${this.deviceQuery}&from=${this.ShiftsFrom}&to=${this.ShiftsTo}`;
            if (this.ShiftNumber > 0) {
                query += `&shift=${this.ShiftNumber}`;
            }
            await this.get(`check/list?${query}`);
            this.Checks = this.readResult<CheckDocument[]>() ?? [];
        }

        /** Печать копии чека по данным фискального накопителя. */
        async PrintCheckCopyFn(): Promise<void> {
            const body = new CheckCopyFnParameters();
            body.DeviceName = this.DeviceName;
            body.FnNumber = this.FnNumber;
            body.FiscalSign = this.FiscalSign;
            body.DocNumber = this.CheckNumber;
            await this.post("check/copy/fn", body);
        }

        /** Получение слипа по идентификатору документа. */
        async GetSlip(): Promise<void> {
            await this.getDocumentById("slip");
        }

        /** Список слипов по кассе. */
        async GetSlipList(): Promise<void> {
            await this.getCheckList("slip/list");
        }

        /** Получение картинки по имени. */
        async GetPicture(): Promise<void> {
            await this.get(`picture?${this.deviceQuery}&id=${encodeURIComponent(this.PictureId)}`);
            if (this.Ok && typeof this.LastResult === "string") {
                this.PictureBase64Result = this.LastResult;
            }
        }

        /** Удаление картинки. */
        async DeletePicture(): Promise<void> {
            await this.delete(`picture?${this.deviceQuery}&id=${encodeURIComponent(this.PictureId)}`);
        }

        // ===== Шаблоны печати и чека =====

        /** Создание шаблона печати. */
        async AddTemplate(): Promise<void> {
            await this.post("template", this.TemplateParameters);
        }

        /** Изменение шаблона печати. */
        async UpdateTemplate(): Promise<void> {
            await this.put("template", this.TemplateParameters);
        }

        /** Удаление шаблона печати. */
        async DeleteTemplate(): Promise<void> {
            await this.delete(`template?id=${encodeURIComponent(this.TemplateName)}`);
        }

        /** Список шаблонов печати. */
        async GetTemplateList(): Promise<void> {
            await this.get("template/list");
            this.Templates = this.readTemplateList();
        }

        /** Получение шаблона печати по имени. */
        async GetTemplate(): Promise<void> {
            await this.get(`template?name=${encodeURIComponent(this.TemplateName)}`);
            this.PrintTemplate = this.readResult<PrintTemplate>();
        }

        /** Создание шаблона чека. */
        async AddCheckTemplate(): Promise<void> {
            await this.post("checkTemplate", this.checkTemplateBody());
        }

        /** Изменение шаблона чека. */
        async UpdateCheckTemplate(): Promise<void> {
            await this.put("checkTemplate", this.checkTemplateBody());
        }

        /** Удаление шаблона чека. */
        async DeleteCheckTemplate(): Promise<void> {
            await this.delete(`checkTemplate?id=${encodeURIComponent(this.TemplateName)}`);
        }

        /** Список шаблонов чека. */
        async GetCheckTemplateList(): Promise<void> {
            await this.get("checkTemplate/list");
            this.CheckTemplates = this.readResult<CheckTemplateListItem[]>() ?? [];
        }

        /** Получение шаблона чека по имени. */
        async GetCheckTemplate(): Promise<void> {
            await this.get(`checkTemplate?id=${encodeURIComponent(this.TemplateName)}`);
            this.CheckTemplate = this.readResult<CheckTemplate>();
        }

        // ===== Очередь печати =====

        /** Состояние очереди печати. */
        async GetQueue(): Promise<void> {
            await this.get("queue");
            this.Queue = this.readResult<QueueItem[]>() ?? [];
        }

        /** Состояние задания в очереди. */
        async GetQueueTask(): Promise<void> {
            await this.get(`queue/task?taskId=${encodeURIComponent(this.QueueTaskId)}`);
            this.QueueTask = this.readResult<QueueTaskState>();
        }

        /** История обработки задания в очереди. */
        async GetQueueTaskHistory(): Promise<void> {
            await this.get(`queue/task/history?taskId=${encodeURIComponent(this.QueueTaskId)}`);
            this.QueueTask = this.readResult<QueueTaskState>();
            if (this.QueueTask) {
                this.OperationHistory = this.QueueTask.History.map((h) => {
                    const item = new OperationHistoryItem();
                    item.Time = h.Time;
                    item.State = h.State;
                    item.Description = h.Description;
                    return item;
                });
            }
        }

        /** Отмена задания в очереди. */
        async CancelQueueTask(): Promise<void> {
            await this.delete(`queue/task?taskId=${encodeURIComponent(this.QueueTaskId)}`);
        }

        // ===== Маркировка (проверка кодов) =====

        /** Проверка кода маркировки через внешний сервис. */
        async VerifyMarking(): Promise<void> {
            const body = new MarkingCodesRequest();
            body.DeviceName = this.DeviceName;
            body.Codes = [...this.MarkingCodes];
            await this.post("marking/km/verify", body);
            this.MarkingVerify = this.readResult<MarkingVerifyResult>();
        }

        /** Проверка кода маркировки через ТС ПИоТ. */
        async VerifyMarkingTsPiot(): Promise<void> {
            const body = new MarkingCodesRequest();
            body.DeviceName = this.DeviceName;
            body.Codes = [...this.MarkingCodes];
            await this.post("marking/km/tspiot/verify", body);
            this.MarkingVerify = this.readResult<MarkingVerifyResult>();
        }

        /** Проверка кода маркировки через ЛМ ЧЗ. */
        async VerifyMarkingLmcz(): Promise<void> {
            const body = new MarkingCodesRequest();
            body.DeviceName = this.DeviceName;
            body.Codes = [...this.MarkingCodes];
            await this.post("marking/km/lmcz/verify", body);
            this.MarkingVerify = this.readResult<MarkingVerifyResult>();
        }

        // ===== Фискализация кассы =====

        fiscalizationBody(): FiscalizationRequest {
            const source = this.FiscalizationParameters;
            const body = new FiscalizationRequest();
            this.fillBase(body);
            if (source === undefined) return body;

            if (source.RnNumber) body.RnNumber = source.RnNumber;
            if (source.TaxationSystems) body.TaxationSystems = source.TaxationSystems;
            if (source.Vatin) body.Vatin = source.Vatin;
            if (source.CompanyName) body.CompanyName = source.CompanyName;
            if (source.Fn) body.Fn = source.Fn;
            if (source.FfdVersionKkt) body.FfdVersionKkt = source.FfdVersionKkt;
            if (source.FfdVersionFn) body.FfdVersionFn = source.FfdVersionFn;
            if (source.RegistrationLabelCodes) body.RegistrationLabelCodes = source.RegistrationLabelCodes;
            if (source.OfdAddress) body.OfdAddress = source.OfdAddress;
            if (source.OfdPort) body.OfdPort = source.OfdPort;
            if (source.AutomaticNumber) body.AutomaticNumber = source.AutomaticNumber;
            if (source.SenderEmail) body.SenderEmail = source.SenderEmail;
            if (source.ReasonCode) body.ReasonCode = source.ReasonCode;
            if (source.IsmHost) body.IsmHost = source.IsmHost;
            if (source.IsmPort) body.IsmPort = source.IsmPort;
            if (source.FnsUrl) body.FnsUrl = source.FnsUrl;
            if (source.OfdVatin) body.OfdVatin = source.OfdVatin;
            if (source.OfdName) body.OfdName = source.OfdName;
            if (source.AgentTypes) body.AgentTypes = source.AgentTypes;
            body.IsBsoSign = source.IsBsoSign;
            body.IsMarking = source.IsMarking;
            body.IsPawnshop = source.IsPawnshop;
            body.IsAssurance = source.IsAssurance;
            body.IsAutomatic = source.IsAutomatic;
            body.IsVending = source.IsVending;
            body.IsAutomaticPrinter = source.IsAutomaticPrinter;
            body.IsOnline = source.IsOnline;
            body.IsLottery = source.IsLottery;
            body.IsGambling = source.IsGambling;
            body.IsExcisable = source.IsExcisable;
            body.IsService = source.IsService;
            body.IsEncrypted = source.IsEncrypted;
            body.IsOffline = source.IsOffline;
            body.IsCateringServices = source.IsCateringServices;
            body.IsWholesaleTrade = source.IsWholesaleTrade;
            if (source.SaleAddress) body.SaleAddress = source.SaleAddress;
            if (source.SaleLocation) body.SaleLocation = source.SaleLocation;
            return body;
        }

        /** Фискализация кассы. */
        async Fiscalization(): Promise<void> {
            await this.post("fiscalization", this.fiscalizationBody());
        }

        /** Асинхронная фискализация кассы. */
        async FiscalizationAsync(): Promise<void> {
            await this.post("fiscalization/async", this.fiscalizationBody());
        }

        /** Результат фискализации по идентификатору документа. */
        async GetFiscalization(): Promise<void> {
            await this.getDocumentById("fiscalization");
            this.FiscalizationDocument = this.readResult<FiscalizationDocument>();
        }

        /** Список операций фискализации по кассе. */
        async GetFiscalizationList(): Promise<void> {
            await this.get(`fiscalization/list?${this.deviceQuery}`);
            this.Fiscalizations = this.readResult<FiscalizationDocument[]>() ?? [];
        }

        // ===== Операции (новая модель, заменяет старый GetLastOperation) =====

        /**
         * Последняя операция из базы. tasktype — PaymentType (CheckType),
         * isProcessed — IsProcessed.
         */
        async GetOperationLast(): Promise<void> {
            const processed = this.IsProcessed ? "true" : "false";
            await this.get(`operation/last?tasktype=${this.PaymentType}&isProcessed=${processed}`);
            this.applyOperation(this.readResult<DeviceTaskInfo>());
        }

        /** Операция по идентификатору документа. */
        async GetOperation(): Promise<void> {
            await this.get(`operation?${this.docIdQuery}`);
            this.applyOperation(this.readResult<DeviceTaskInfo>());
        }

        /** История операции по идентификатору документа. */
        async GetOperationHistory(): Promise<void> {
            await this.get(`operation/history?${this.docIdQuery}`);
            this.OperationHistory = this.readResult<OperationHistoryItem[]>() ?? [];
        }

        /** TLV-данные операции. */
        async GetOperationTlv(): Promise<void> {
            await this.get(`operation/tlv?${this.docIdQuery}`);
            if (this.Ok && typeof this.LastResult === "string") {
                this.OperationTlv = this.LastResult;
            }
        }

        /** Данные маркировки операции. */
        async GetOperationKm(): Promise<void> {
            await this.get(`operation/km?${this.docIdQuery}`);
            this.OperationKm = this.readResult<OperationKmRow[]>() ?? [];
        }

        /** Связанные операции. */
        async GetOperationRelated(): Promise<void> {
            await this.get(`operation/related?${this.docIdQuery}`);
            this.RelatedOperations = this.readResult<DeviceTaskInfo[]>() ?? [];
        }

        /** Список операций за период. */
        async GetOperationList(): Promise<void> {
            await this.get(`operation/list?from=${this.ShiftsFrom}&to=${this.ShiftsTo}`);
            this.Operations = this.readResult<OperationListItem[]>() ?? [];
        }
    };
}