import type { Constructor } from "./Constructor.js";
import type { KkmTransport } from "../data/KkmTransport.js";
import type { ResponseResult } from "../data/ResponseResult.js";
import { FiscalResult } from "../dto/results/FiscalResult.js";
import { CheckDocument } from "../dto/results/CheckDocument.js";
import { ShiftListItem } from "../dto/results/ShiftListItem.js";
import { PrintTemplate } from "../dto/templates/PrintTemplate.js";
import { DeviceTaskInfo } from "../dto/operations/OperationModels.js";


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

        /** Аналог DocIdQuery в C# — используется новыми методами (operation, fiscalization, ...). */
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

            if (typeof obj.datetime === "string") fiscal.datetime = obj.datetime;
            if (typeof obj.deviceName === "string") fiscal.deviceName = obj.deviceName;
            if (typeof obj.docId === "string") fiscal.docId = obj.docId;
            if (typeof obj.fnsUrl === "string") fiscal.fnsUrl = obj.fnsUrl;
            if (typeof obj.fnNumber === "string") fiscal.fnNumber = obj.fnNumber;
            if (typeof obj.rnNumber === "string") fiscal.rnNumber = obj.rnNumber;
            if (typeof obj.fiscalDatetime === "string") fiscal.fiscalDatetime = obj.fiscalDatetime;
            if (typeof obj.fiscalSign === "string") fiscal.fiscalSign = obj.fiscalSign;
            if (typeof obj.shiftNumber === "number") fiscal.shiftNumber = obj.shiftNumber;
            if (typeof obj.fiscalNumber === "number") fiscal.fiscalNumber = obj.fiscalNumber;

            const hasSignal =
                (fiscal.fiscalSign !== undefined && fiscal.fiscalSign.length > 0) ||
                fiscal.fiscalNumber > 0 ||
                fiscal.shiftNumber > 0 ||
                (fiscal.docId !== undefined && fiscal.docId.length > 0);

            if (!hasSignal) return;

            this.FiscalResult = fiscal;

            if (fiscal.fiscalSign) this.FiscalSign = fiscal.fiscalSign;
            if (fiscal.fiscalNumber > 0) this.CheckNumber = fiscal.fiscalNumber;
            if (fiscal.shiftNumber > 0) this.ShiftNumber = fiscal.shiftNumber;
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

            const fiscal = new FiscalResult();
            fiscal.datetime = document.Date;
            if (document.DeviceName !== undefined) fiscal.deviceName = document.DeviceName;
            if (document.DocId !== undefined) fiscal.docId = document.DocId;
            if (document.DocumentHeader?.FnsUrl !== undefined) fiscal.fnsUrl = document.DocumentHeader.FnsUrl;
            if (document.DocumentHeader?.Fn !== undefined) fiscal.fnNumber = document.DocumentHeader.Fn;
            if (document.DocumentHeader?.RnNumber !== undefined) fiscal.rnNumber = document.DocumentHeader.RnNumber;
            fiscal.fiscalDatetime = toCompactDateTime(document.FiscalDate);
            if (document.FiscalSign !== undefined) fiscal.fiscalSign = document.FiscalSign;
            fiscal.shiftNumber = document.ShiftNumber;
            fiscal.fiscalNumber = document.DocNumber;

            this.FiscalResult = fiscal;
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