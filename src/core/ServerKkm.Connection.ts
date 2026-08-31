import type { Constructor } from "./Constructor.js";
import { Cashier } from "../dto/Cashier.js";
import { DeviceSettings } from "../dto/admin/DeviceSettings.js";
import { ServiceSettings } from "../dto/admin/ServiceSettings.js";
import { ServiceUser } from "../dto/admin/ServiceUser.js";
import { TemplateParameters } from "../dto/templates/TemplateParameters.js";
import { CheckTemplateParameters } from "../dto/templates/CheckTemplateParameters.js";
import { FiscalizationParameters } from "../dto/fiscalization/FiscalizationModels.js";

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

        /** Логин для Basic Auth при получении токена. По умолчанию Admin. */
        AuthUserName = "Admin";

        /** Пароль для Basic Auth при получении токена. По умолчанию Admin. */
        AuthPassword = "Admin";

        /** Имя пула устройств. */
        PoolName = "";

        /** Тип отчёта для списка Z-отчётов. */
        ReportType = 0;

        /** Идентификатор задания в очереди печати. */
        QueueTaskId = "";

        /** Имя картинки или шаблона. */
        PictureId = "";

        /** Имя шаблона печати или чека. */
        TemplateName = "";

        /** Идентификатор пользователя сервера ККМ. */
        UserId = "";

        /** Номер ФН для печати копии чека по данным ФН. */
        FnNumber = "";

        /** Коды маркировки для проверки. */
        MarkingCodes: string[] = [];

        /** Настройки кассы для добавления или изменения. */
        DeviceSettings: DeviceSettings | undefined = undefined;

        /** Настройки службы печати. */
        ServiceSettings: ServiceSettings | undefined = undefined;

        /** Пользователь сервера ККМ. */
        ServiceUser: ServiceUser | undefined = undefined;

        /** Параметры шаблона печати. */
        TemplateParameters: TemplateParameters | undefined = undefined;

        /** Параметры шаблона чека. */
        CheckTemplateParameters: CheckTemplateParameters | undefined = undefined;

        /** Параметры фискализации. */
        FiscalizationParameters: FiscalizationParameters | undefined = undefined;
    };
}