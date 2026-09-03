import type { Constructor } from "./Constructor.js";
import type { KkmTransport } from "../data/KkmTransport.js";
import type { ResponseResult } from "../data/ResponseResult.js";
import { FiscalResult } from "../dto/results/FiscalResult.js";
import { Backlog } from "../dto/results/Backlog.js";
import { CashDrawer } from "../dto/results/CashDrawer.js";
import { FiscalOutputParameters } from "../dto/results/FiscalOutputParameters.js";
import { CheckDocument } from "../dto/results/CheckDocument.js";
import { ShiftListItem } from "../dto/results/ShiftListItem.js";
import { PrintTemplate } from "../dto/templates/PrintTemplate.js";
import { DeviceTaskInfo } from "../dto/operations/DeviceTaskInfo.js";
import { ShiftState } from "../dto/enums/ShiftState.js";
import { Warnings } from "../dto/results/Warnings.js";


function toCompactDateTime(iso: string | undefined): string {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
    return (
        d.getFullYear().toString() +
        pad(d.getMonth() + 1) +
        pad(d.getDate()) +
        pad(d.getHours()) +
        pad(d.getMinutes()) +
        pad(d.getSeconds())
    );
}

/**
 * Минимальный набор членов, которые Internals ожидает от TBase — то есть
 * то, что реально используется здесь из State/Connection/CheckInput и
 * базового класса (ServerKkm.ts).
 */
interface InternalsRequirements {
    http: KkmTransport;
    Host: string;
    Port: number;
    UseHttps: boolean;
    Token: string;
    TerminalId: string;
    TimeoutMs: number;
    AuthUserName: string;
    AuthPassword: string;
    DeviceName: string;
    DocumentId: string;
    ShiftsFrom: string;
    ShiftsTo: string;

    Ok: boolean;
    ErrorCode: number;
    ErrorDescription: string;
    LastResult: unknown;
    FiscalResult: FiscalResult | undefined;
    FiscalSign: string;
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
    FnNumber: string;
    CashBalance: number;
    ShiftNumber: number;
    Check: CheckDocument | undefined;
    Checks: CheckDocument[];
    Shifts: ShiftListItem[];
    Operation: DeviceTaskInfo | undefined;
}

/** Транспортная инфраструктура: выбор соединения, вызов и разбор ответа.*/
export function WithInternals<TBase extends Constructor<InternalsRequirements>>(Base: TBase) {
    return class extends Base {

        get deviceQuery(): string {
            return `device=${encodeURIComponent(this.DeviceName)}`;
        }

        get idQuery(): string {
            return `id=${encodeURIComponent(this.DocumentId)}`;
        }

        get docIdQuery(): string {
            return `docId=${encodeURIComponent(this.DocumentId)}`;
        }

        /** Настраивает и возвращает транспорт по текущим параметрам подключения. */
        transport(): KkmTransport {
            this.http.host = this.Host;
            this.http.port = this.Port;
            this.http.useHttps = this.UseHttps;
            this.http.token = this.Token;
            this.http.terminalId = this.TerminalId;
            this.http.timeoutMs = this.TimeoutMs;
            this.http.basicAuthUser = this.AuthUserName;
            this.http.basicAuthPassword = this.AuthPassword;
            return this.http;
        }

        /** Раскладывает ResponseResult в плоские свойства состояния (Ok/ErrorCode/...). */
        apply<T>(result: ResponseResult<T>): void {
            this.Ok = result.Success;
            this.ErrorCode = result.Code;
            this.ErrorDescription = result.Description ?? "";
            this.LastResult = result.Result;
            this.FiscalResult = undefined;
            this.extractFiscalResult(this.LastResult);
        }

        /**
         * Раскладывает результат фискальной операции из ответа: заполняет FiscalResult
         * и переносит ключевые значения в плоские свойства.
         */
        extractFiscalResult(result: unknown): void {
            if (!result || typeof result !== "object" || Array.isArray(result)) return;

            const obj = result as Record<string, unknown>;
            const fiscal = new FiscalResult();

            if (typeof obj.Datetime === "string") fiscal.Datetime = obj.Datetime;
            if (typeof obj.DeviceName === "string") fiscal.DeviceName = obj.DeviceName;
            if (typeof obj.DocId === "string") fiscal.DocId = obj.DocId;
            if (typeof obj.FnsUrl === "string") fiscal.FnsUrl = obj.FnsUrl;
            if (typeof obj.FnNumber === "string") fiscal.FnNumber = obj.FnNumber;
            if (typeof obj.RnNumber === "string") fiscal.RnNumber = obj.RnNumber;
            if (typeof obj.FiscalDatetime === "string") fiscal.FiscalDatetime = obj.FiscalDatetime;
            if (typeof obj.FiscalSign === "string") fiscal.FiscalSign = obj.FiscalSign;
            if (typeof obj.ShiftNumber === "number") fiscal.ShiftNumber = obj.ShiftNumber;
            if (typeof obj.FiscalNumber === "number") fiscal.FiscalNumber = obj.FiscalNumber;
            if (typeof obj.CashSum === "number") fiscal.CashSum = obj.CashSum;
            if (obj.CashDrawer && typeof obj.CashDrawer === "object") fiscal.CashDrawer = obj.CashDrawer as CashDrawer;
            if (obj.Backlog && typeof obj.Backlog === "object") fiscal.Backlog = obj.Backlog as Backlog;
            if (obj.OutputParameters && typeof obj.OutputParameters === "object") fiscal.OutputParameters = obj.OutputParameters as FiscalOutputParameters;
            if (typeof obj.ShiftState === "number") fiscal.ShiftState = obj.ShiftState;

            const hasFiscal =
                (fiscal.FiscalSign !== undefined && fiscal.FiscalSign.length > 0) ||
                fiscal.FiscalNumber > 0 ||
                fiscal.ShiftNumber > 0 ||
                (fiscal.DocId !== undefined && fiscal.DocId.length > 0) ||
                (fiscal.FnNumber !== undefined && fiscal.FnNumber.length > 0) ||
                (fiscal.RnNumber !== undefined && fiscal.RnNumber.length > 0) ||
                fiscal.CashSum !== undefined ||
                fiscal.CashDrawer !== undefined ||
                fiscal.Backlog !== undefined ||
                fiscal.OutputParameters !== undefined ||
                fiscal.ShiftState !== undefined ||
                (fiscal.Datetime !== undefined && fiscal.Datetime.length > 0) ||
                (fiscal.FiscalDatetime !== undefined && fiscal.FiscalDatetime.length > 0) ||
                (fiscal.FnsUrl !== undefined && fiscal.FnsUrl.length > 0);

            if (!hasFiscal) return;

            this.FiscalResult = fiscal;

            if (fiscal.DocId) this.DocumentId = fiscal.DocId;
            if (fiscal.ShiftNumber > 0) this.ShiftNumber = fiscal.ShiftNumber;
            if (fiscal.FiscalNumber > 0) this.CheckNumber = fiscal.FiscalNumber;
            if (fiscal.ShiftState !== undefined) this.CurrentShiftState = fiscal.ShiftState;
            if (fiscal.FnsUrl) this.FnsUrl = fiscal.FnsUrl;

            if (fiscal.FnNumber) {
                this.FnNumber = fiscal.FnNumber;
                this.IsFnPresent = true;
            } else if (fiscal.FnNumber !== undefined) {
                this.IsFnPresent = false;
            }

            if (fiscal.RnNumber) {
                this.RnNumber = fiscal.RnNumber;
                this.IsFiscal = true;
            } else if (fiscal.RnNumber !== undefined) {
                this.IsFiscal = false;
            }

            if (fiscal.FiscalSign) this.FiscalSign = fiscal.FiscalSign;
            if (fiscal.Datetime) this.ServerDateTime = fiscal.Datetime;
            if (fiscal.FiscalDatetime) {
                this.FiscalDateTime = fiscal.FiscalDatetime;
                this.DeviceDateTime = fiscal.FiscalDatetime;
            }

            if (fiscal.CashDrawer) {
                this.CashBalance = fiscal.CashDrawer.Sum;
            } else if (fiscal.CashSum !== undefined) {
                this.CashBalance = fiscal.CashSum;
            }

            this.applyBacklog(fiscal.Backlog);
            this.applyOutputParameters(fiscal.OutputParameters);
        }

        /** Переносит данные о непереданных в ОФД документах в плоские свойства. */
        applyBacklog(backlog: Backlog | undefined): void {
            if (backlog === undefined) return;

            this.BacklogDocumentsCount = backlog.DocumentsCounter;
            if (backlog.DocumentsCounter > 0) {
                this.BacklogFirstDocumentNumber = backlog.DocumentFirstNumber;
                if (backlog.DocumentFirstDateTime) {
                    this.BacklogFirstDocumentDateTime = backlog.DocumentFirstDateTime;
                }
            } else {
                this.BacklogFirstDocumentNumber = 0;
                this.BacklogFirstDocumentDateTime = undefined;
            }
        }

        /** Переносит вложенный блок OutputParameters (данные о ФН, смене, ящике) в плоские свойства. */
        applyOutputParameters(output: FiscalOutputParameters | undefined): void {
            if (output === undefined) return;

            if (output.NumberOfChecks > 0) this.CheckNumberInShift = output.NumberOfChecks;
            if (output.DateTime) {
                this.FiscalDateTime = output.DateTime;
                this.DeviceDateTime = output.DateTime;
            }
            if (output.ShiftNumber > 0) this.ShiftNumber = output.ShiftNumber;
            if (output.CheckNumber > 0) this.CheckNumber = output.CheckNumber;
            this.CashBalance = output.CashBalance;

            if (output.FnValidityDate) this.FnValidityDate = output.FnValidityDate;
            if (output.ResourcesFn > 0) {
                this.FnDaysResources = output.ResourcesFn;
            } else if (this.FnValidityDate) {
                const validUntil = new Date(this.FnValidityDate);
                if (!Number.isNaN(validUntil.getTime())) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    validUntil.setHours(0, 0, 0, 0);
                    const days = Math.round((validUntil.getTime() - today.getTime()) / 86400000);
                    this.FnDaysResources = days < 0 ? 0 : days;
                }
            }

            this.applyBacklog(output.Backlog);

            if (output.FnWarnings !== undefined) this.FnWarnings = output.FnWarnings;
        }

        /** Приводит LastResult к нужному типу T (доверяем форме JSON, без валидации). */
        readResult<T>(): T | undefined {
            if (this.LastResult === undefined || this.LastResult === null) return undefined;
            return this.LastResult as T;
        }

        applyDocument(document: CheckDocument | undefined): void {
            this.Check = document;
            if (document === undefined) return;

            if (document.FiscalSign) this.FiscalSign = document.FiscalSign;
            if (document.DocNumber > 0) this.CheckNumber = document.DocNumber;
            if (document.ShiftNumber > 0) this.ShiftNumber = document.ShiftNumber;
            if (document.DocId) this.DocumentId = document.DocId;
            if (document.DocNumberInShift > 0) this.CheckNumberInShift = document.DocNumberInShift;

            const header = document.DocumentHeader;
            if (header?.Fn) {
                this.FnNumber = header.Fn;
                this.IsFnPresent = true;
            }
            if (header?.RnNumber) {
                this.RnNumber = header.RnNumber;
                this.IsFiscal = true;
            }
            if (header?.FnsUrl) this.FnsUrl = header.FnsUrl;

            const fiscal = new FiscalResult();
            fiscal.Datetime = document.Date;
            if (document.DeviceName !== undefined) fiscal.DeviceName = document.DeviceName;
            if (document.DocId !== undefined) fiscal.DocId = document.DocId;
            if (header?.FnsUrl !== undefined) fiscal.FnsUrl = header.FnsUrl;
            if (header?.Fn !== undefined) fiscal.FnNumber = header.Fn;
            if (header?.RnNumber !== undefined) fiscal.RnNumber = header.RnNumber;
            fiscal.FiscalDatetime = toCompactDateTime(document.FiscalDate);
            if (document.FiscalSign !== undefined) fiscal.FiscalSign = document.FiscalSign;
            fiscal.ShiftNumber = document.ShiftNumber;
            fiscal.FiscalNumber = document.DocNumber;

            this.FiscalResult = fiscal;

            if (fiscal.Datetime) this.ServerDateTime = fiscal.Datetime;
            if (fiscal.FiscalDatetime) {
                this.FiscalDateTime = fiscal.FiscalDatetime;
                this.DeviceDateTime = fiscal.FiscalDatetime;
            }
        }

        /**
         * Разбирает список шаблонов из LastResult: сервер может вернуть либо
         * массив строк (только имена), либо массив полных объектов PrintTemplate.
         */
        readTemplateList(): PrintTemplate[] {
            if (!Array.isArray(this.LastResult)) return [];

            return this.LastResult.map((item) => {
                if (typeof item === "string") {
                    const template = new PrintTemplate();
                    template.Name = item;
                    return template;
                }
                return item as PrintTemplate;
            });
        }

        /** Сохраняет операцию и подтягивает DocumentId из неё, если он есть. */
        applyOperation(operation: DeviceTaskInfo | undefined): void {
            this.Operation = operation;
            if (operation?.DocId) {
                this.DocumentId = operation.DocId;
            }
        }

        async get(path: string, useBasicAuth = false): Promise<void> {
            this.apply(await this.transport().get(path, useBasicAuth));
        }

        async post(path: string, body?: object): Promise<void> {
            this.apply(await this.transport().post(path, body));
        }

        async put(path: string, body?: object): Promise<void> {
            this.apply(await this.transport().put(path, body));
        }

        async delete(path: string): Promise<void> {
            this.apply(await this.transport().delete(path));
        }

        /** GET документа по DocumentId. */
        async getDocumentById(path: string): Promise<void> {
            await this.get(`${path}?${this.idQuery}`);
            this.applyDocument(this.readResult<CheckDocument>());
        }

        /** GET списка документов по кассе. */
        async getCheckList(path: string): Promise<void> {
            await this.get(`${path}?${this.deviceQuery}`);
            this.Checks = this.readResult<CheckDocument[]>() ?? [];
        }

        /** GET списка отчётов за период ShiftsFrom..ShiftsTo, с опциональным доп. фильтром в query. */
        async getReportList(path: string, extraQuery?: string): Promise<void> {
            let query = `${this.deviceQuery}&from=${this.ShiftsFrom}&to=${this.ShiftsTo}`;
            if (extraQuery) {
                query += `&${extraQuery}`;
            }
            await this.get(`${path}?${query}`);
            this.Shifts = this.readResult<ShiftListItem[]>() ?? [];
        }
    };
}