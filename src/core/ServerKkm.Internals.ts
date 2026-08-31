import type { Constructor } from "./Constructor.js";
import type { KkmTransport } from "../data/KkmTransport.js";
import type { ResponseResult } from "../data/ResponseResult.js";
import { FiscalResult } from "../dto/results/FiscalResult.js";
import { CheckDocument } from "../dto/results/CheckDocument.js";
import { ShiftListItem } from "../dto/results/ShiftListItem.js";


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

interface InternalsRequirements {
    http: KkmTransport;
    Host: string;
    Port: number;
    UseHttps: boolean;
    Token: string;
    TerminalId: string;
    TimeoutMs: number;
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

        /** Настраивает и возвращает транспорт по текущим параметрам подключения. */
        transport(): KkmTransport {
            this.http.host = this.Host;
            this.http.port = this.Port;
            this.http.useHttps = this.UseHttps;
            this.http.token = this.Token;
            this.http.terminalId = this.TerminalId;
            this.http.timeoutMs = this.TimeoutMs;
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

            // Обновляем плоские свойства только если сервер реально вернул значение,
            // чтобы не затирать их нулями на ответах без фискальных полей.
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

        async get(path: string): Promise<void> {
            this.apply(await this.transport().get(path));
        }

        async post(path: string, body?: object): Promise<void> {
            this.apply(await this.transport().post(path, body));
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

        /** GET списка отчётов за период ShiftsFrom..ShiftsTo. */
        async getReportList(path: string): Promise<void> {
            await this.get(`${path}?${this.deviceQuery}&from=${this.ShiftsFrom}&to=${this.ShiftsTo}`);
            this.Shifts = this.readResult<ShiftListItem[]>() ?? [];
        }
    };
}