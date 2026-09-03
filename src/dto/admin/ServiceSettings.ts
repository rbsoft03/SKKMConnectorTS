import { ProxyConfig } from "./ProxyConfig.js";

/** Настройки службы печати. */
export class ServiceSettings {
    /**TCP-порт WCF-службы сервера ККМ. */
    WcfServicePort: number = 0;
    /**TCP-порт веб-службы (HTTP API). */
    WebServicePort: number = 0;
    /**Таймаут ожидания ответа службы (строка в формате, ожидаемом сервером). */
    ServiceTimeOut: string = "";
    /**Настройки прокси-сервера.  */
    ProxyServerSettings?: ProxyConfig;
    /**Максимальное число заданий в очереди печати. */
    MaxQueueSize: number = 0;
    /** true — повторять печать при ошибке; false — не повторять. */
    RepeatPrintingOnError: boolean = false;
}