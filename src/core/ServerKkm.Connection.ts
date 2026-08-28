import type { Constructor } from "./Constructor.js";
import { Cashier } from "../dto/Cashier.js";

/**Параметры подключения к серверу ККМ и данные кассира.*/
export function WithConnection<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        /** Хост сервера ККМ (IP или DNS). Можно менять между запросами, пока программа запущена. */
        Host = "localhost";

        /** TCP-порт сервера ККМ. Можно менять между запросами, пока программа запущена. */
        Port = 4398;

        /** HTTPS вместо HTTP. */
        UseHttps = false;

        /** Таймаут запроса к серверу ККМ в миллисекундах. По умолчанию 60 секунд. */
        TimeoutMs = 60_000;

        /** Токен авторизации (заголовок api_key). Можно менять между запросами, пока программа запущена. */
        Token = "";

        /** Идентификатор терминала. */
        TerminalId = "";

        /** Имя устройства. */
        DeviceName = "";

        /** Сведения о кассире (продавце). */
        Cashier: Cashier | undefined = undefined;
    };
}