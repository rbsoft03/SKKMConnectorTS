import type { Constructor } from "./Constructor.js";
import { CheckbaseParameters } from "../data/contracts/CheckbaseParameters.js";
import { OverallTotals } from "../data/contracts/OverallTotals.js";
import { LineLengthV2 } from "../data/contracts/LineLengthV2.js";
import { LastOperationDto } from "../data/contracts/LastOperationDto.js";
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

/**
 * Минимальный набор членов, которые Api ожидает от TBase — практически
 * всё, что есть в State/Connection/CheckInput, плюс методы Internals/Requests.
 */
interface ApiRequirements {
    get(path: string): Promise<void>;
    post(path: string, body?: object): Promise<void>;
    getDocumentById(path: string): Promise<void>;
    getCheckList(path: string): Promise<void>;
    getReportList(path: string): Promise<void>;
    readResult<T>(): T | undefined;
    readonly deviceQuery: string;
    readonly idQuery: string;

    checkBase(): CheckbaseParameters;
    checkBody(): CheckParameters;
    correction120Body(): Correction120Parameters;
    correction105Body(): Correction105Parameters;
    slipBody(): DocumentParameters;
    cashBody(): CashdrawParameters;

    DeviceName: string;
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
    LastOperationDate: string;
    LastOperationType: number;
    LastOperationDocNumber: number;
    LastOperationShiftNumber: number;
    LastOperationSum: number;
    MarkingCheck: RequestKmResult | undefined;
    MarkingProcessing: ProcessingKmResult | undefined;
    Check: CheckDocument | undefined;
    Checks: CheckDocument[];
    TaskStatus: ResponseTaskStatus | undefined;
    PrintForm: PrintFormLine[];
    Shifts: ShiftListItem[];
}

export function WithApi<TBase extends Constructor<ApiRequirements>>(Base: TBase) {
    return class extends Base {
        /** Очистка входных данных перед новым запросом и результаты прошлого вызова. */
        NewRequest(): void {
            this.PaymentType = CheckType.Sale;
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
            this.LastOperationDate = "";
            this.LastOperationType = 0;
            this.LastOperationDocNumber = 0;
            this.LastOperationShiftNumber = 0;
            this.LastOperationSum = 0;
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

        /** Получение последней операции из базы сервера. */
        async GetLastOperation(): Promise<void> {
            await this.get("operation/last");
            const operation = this.readResult<LastOperationDto>();
            if (operation === undefined) return;
            this.LastOperationDate = operation.Date;
            this.LastOperationType = operation.TaskType;
            this.LastOperationDocNumber = operation.DocNumber;
            this.LastOperationShiftNumber = operation.ShiftNumber;
            this.LastOperationSum = operation.Sum;
        }

        /** Получение счётчиков за смену. */
        async GetTotals(): Promise<void> {
            await this.get(`kkt/counters/shift?${this.deviceQuery}`);
            this.ShiftTotals = this.readResult<ResShiftTotal>();
        }

        /** Получение списка Z-отчётов за период. */
        async GetShiftList(): Promise<void> {
            await this.getReportList("shift/z/list");
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
    };
}