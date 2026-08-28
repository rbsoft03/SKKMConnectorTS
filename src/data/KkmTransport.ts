import { ResponseResult } from "./ResponseResult.js";

const API_PATH = "/PrintService/api/v4/";
const JSON_MEDIA_TYPE = "application/json";
const DEFAULT_TIMEOUT_MS = 60_000;

/** HTTP-транспорт к серверу ККМ.*/
export class KkmTransport {
    host: string = "localhost";
    port: number = 4398;
    useHttps: boolean = false;
    token?: string;
    terminalId?: string;

    /** Таймаут запроса в миллисекундах. */
    timeoutMs: number = DEFAULT_TIMEOUT_MS;

    private disposed = false;

    async get(path: string): Promise<ResponseResult<unknown>> {
        return this.send("GET", path, undefined);
    }

    async post(path: string, body?: object): Promise<ResponseResult<unknown>> {
        return this.send("POST", path, body);
    }

    /** Закрывает транспорт. После вызова все запросы будут отклонены . */
    dispose(): void {
        this.disposed = true;
    }

    private async send(
        method: "GET" | "POST",
        relativeUrl: string,
        body: object | undefined
    ): Promise<ResponseResult<unknown>> {
        if (this.disposed) {
            return this.failResult(-1, "Коннектор закрыт. Создайте новый ServerKkm.");
        }
        if (!this.host || this.host.trim().length === 0 || this.port < 1 || this.port > 65535) {
            return this.failResult(-1, "Укажите Host и Port сервера ККМ.");
        }

        const url = this.requestUri(relativeUrl);
        const headers = this.buildHeaders(method);

        let requestBody: string | undefined;
        if (method === "POST" && body !== undefined) {
            requestBody = JSON.stringify(body, null, 2);
        }

        const timeoutMs = this.timeoutMs > 0 ? this.timeoutMs : DEFAULT_TIMEOUT_MS;
        const controller = new AbortController();
        const timeoutHandle = setTimeout(() => controller.abort(), timeoutMs);

        const init: RequestInit = { method, headers, signal: controller.signal };
        if (requestBody !== undefined) {
            init.body = requestBody;
        }

        try {
            const response = await fetch(url, init);

            const responseBody = await response.text();
            const statusCode = response.status;

            if (!responseBody || responseBody.trim().length === 0) {
                return this.failResult(statusCode, this.describeHttpError(statusCode, response.statusText));
            }

            try {
                const parsed: unknown = JSON.parse(responseBody);
                return this.toResponseResult(parsed);
            } catch {
                return this.failResult(statusCode, this.describeHttpError(statusCode, "некорректный ответ сервера"));
            }
        } catch (err) {
            if (err instanceof DOMException && err.name === "AbortError") {
                return this.failResult(-2, "Превышено время ожидания ответа сервера");
            }
            const message = err instanceof Error ? err.message : String(err);
            return this.failResult(-1, `Ошибка соединения: ${message}`);
        } finally {
            clearTimeout(timeoutHandle);
        }
    }

    /**
     * Собирает полный URL: схема + host + port + ApiPath + path + query.
     * Query-строка переносится как есть, без повторного кодирования.
     */
    private requestUri(relativeUrl: string): string {
        const queryStart = relativeUrl.indexOf("?");
        const path = queryStart < 0 ? relativeUrl : relativeUrl.slice(0, queryStart);
        const query = queryStart < 0 ? "" : relativeUrl.slice(queryStart + 1);

        const scheme = this.useHttps ? "https" : "http";
        const trimmedApiPath = API_PATH.replace(/\/+$/, "");
        const trimmedPath = path.replace(/^\/+/, "");
        const fullPath = `${trimmedApiPath}/${trimmedPath}`;

        return `${scheme}://${this.host}:${this.port}${fullPath}${query ? `?${query}` : ""}`;
    }

    private buildHeaders(method: "GET" | "POST"): Record<string, string> {
        const headers: Record<string, string> = {};

        if (method === "POST") {
            headers["Content-Type"] = JSON_MEDIA_TYPE;
        }
        if (this.token) {
            headers["api_key"] = this.token;
        }
        if (this.terminalId) {
            headers["TerminalId"] = this.terminalId;
        }

        return headers;
    }

    /**Приводит "сырой" распарсенный JSON к ResponseResult<unknown>.*/
    private toResponseResult(raw: unknown): ResponseResult<unknown> {
        const result = new ResponseResult<unknown>();

        if (raw && typeof raw === "object") {
            const obj = raw as Record<string, unknown>;
            const findKey = (name: string) =>
                Object.keys(obj).find((k) => k.toLowerCase() === name.toLowerCase());

            const codeKey = findKey("Code");
            const descKey = findKey("Description");
            const successKey = findKey("Success");
            const resultKey = findKey("Result");

            if (codeKey !== undefined) result.Code = Number(obj[codeKey]) || 0;
            if (descKey !== undefined && obj[descKey] !== null) {
                result.Description = String(obj[descKey]);
            }
            if (successKey !== undefined) result.Success = Boolean(obj[successKey]);
            if (resultKey !== undefined && obj[resultKey] !== null) {
                result.Result = obj[resultKey];
            }
        }

        return result;
    }

    private failResult(code: number, description: string): ResponseResult<unknown> {
        const result = new ResponseResult<unknown>();
        result.Success = false;
        result.Code = code;
        result.Description = description;
        return result;
    }

    private describeHttpError(statusCode: number, fallback: string): string {
        switch (statusCode) {
            case 401:
                return "Ошибка авторизации. Укажите токен или включите анонимный доступ на сервере ККМ.";
            case 403:
                return "Доступ запрещён. Проверьте токен API.";
            default:
                return `Ошибка HTTP ${statusCode}: ${fallback}`;
        }
    }
}