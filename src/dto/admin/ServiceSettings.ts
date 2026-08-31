import { ProxyConfig } from "./ProxyConfig.js";

/** Настройки службы печати. */
export class ServiceSettings {
    WcfServicePort: number = 0;
    WebServicePort: number = 0;
    ServiceTimeOut: string = "";
    ProxyServerSettings?: ProxyConfig;
    MaxQueueSize: number = 0;
    RepeatPrintingOnError: boolean = false;
}