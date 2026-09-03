import type { ConnectionMethod } from "../enums/ConnectionMethod.js";
import type { DeviceType } from "../enums/DeviceType.js";

/**Настройки кассы на сервере ККМ. */
export class DeviceSettings {
    /**Имя кассы на сервере ККМ (уникальный идентификатор устройства). */
    DeviceName: string = "";
    /**Тип драйвера ККТ. Используйте enum <see cref="DeviceType"/>. */
    DeviceType?: DeviceType;
    /**<c>true</c> — устройство доступно для печати; <c>false</c> — недоступно.  */
    Available: boolean = false;
    /**Способ связи с ККТ. Используйте enum <see cref="ConnectionMethod"/>  */
    /**(Com — COM-порт, TcpIp — сеть). */
    MethodConnection?: ConnectionMethod;
    /**Номер COM-порта. Используется при <see cref="ConnectionMethod.Com"/>. */
    PortNumber: number = 0;
    /**Скорость COM-порта (бод). Пример: <c>9600</c>, <c>115200</c>.  */
    BaudRate: number = 0;
    /**IP-адрес ККТ. Используется при <see cref="ConnectionMethod.TcpIp"/>.  */
    IpAddress: string = "";
    /**TCP-порт ККТ. Используется при <see cref="ConnectionMethod.TcpIp"/>.  */
    TcpPort: number = 0;
    /**Пароль пользователя ККТ.  */
    Password: string = "";
    /**Пароль администратора / доступ к настройкам ККТ.  */
    AccessPassword: string = "";
    /**Заводской номер ККТ.  */
    SerialNumber: string = "";
    /**ИНН организации-пользователя ККТ.  */
    Vatin: string = "";
    /**Наименование организации.  */
    OrganizationName: string = "";
    /**Адрес места осуществления расчётов. */
    SaleAddress: string = "";
    /**Место расчётов (краткое наименование: офис, торговый зал и т.п.). */
    ClientSaleLocation: string = "";
    /**Имя кассира по умолчанию для этой кассы.  */
    Cashier: string = "";
    /**ИНН кассира по умолчанию. */
    CashierVatin: string = "";
    /**Email отправителя чека (тег 1117).  */
    SenderEmail: string = "";
    /**Таймаут соединения с ККТ, миллисекунды.  */
    TimeoutConnection: number = 0;
    /**Таймаут ожидания завершения печати, миллисекунды.  */
    TimeoutWaitForPrinting: number = 0;
    /**DNS-имя или IP-адрес сервера ОФД. */
    OfdAddress: string = "";
    /**TCP-порт сервера ОФД.  */
    OfdPort: number = 0;
    /**Имя пула устройств, в который входит касса (если используется пул). */
    Pool: string = "";
    /**Параметр шаблона печати H1.  */
    TemplateSettingH1: string = "";
    /**Параметр шаблона печати H2.  */
    TemplateSettingH2: string = "";
    /**Параметр шаблона печати H3.  */
    TemplateSettingH3: string = "";
    /**Параметр шаблона печати H4.  */
    TemplateSettingH4: string = "";
    /**Параметр шаблона печати H5.  */
    TemplateSettingH5: string = "";
}