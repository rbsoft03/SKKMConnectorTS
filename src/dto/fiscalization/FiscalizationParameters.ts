import type { Cashier } from "../Cashier.js";
import type { FiscalizationReasonCode } from "../enums/FiscalizationReasonCode.js";

/** Параметры фискализации ККТ. */
export class FiscalizationParameters {
    /**Имя кассы на сервере ККМ. Если пусто — берётся из <c>kkm.DeviceName</c>. */
    DeviceName: string = "";
    /**Кассир, выполняющий регистрацию. */
    Cashier?: Cashier;
    /**Регистрационный номер ККТ (РНМ), выданный при регистрации в ФНС. */
    RnNumber: string = "";
    /**Применяемые системы налогообложения — коды через запятую */
    /**(0 — ОСН, 1 — УСН доход, 2 — УСН доход−расход, 3 — ЕНВД, 4 — ЕСХН, 5 — ПСН). */
    TaxationSystems: string = "";
    /**ИНН организации-пользователя ККТ. */
    Vatin: string = "";
    /**Наименование организации-пользователя ККТ. */
    CompanyName: string = "";
    /**Заводской номер фискального накопителя (ФН). */
    Fn: string = "";
    /**Версия формата фискальных документов ККТ.Пример: "1.2", "1.05". */  
    FfdVersionKkt: string = "";
    /**Версия формата фискальных документов ФН.Пример:"1.2" */
    FfdVersionFn: string = "";
    /**Коды причин изменения сведений о ККТ (через запятую или точку, по формату сервера). */
    /**Пример: "3.1". */
    RegistrationLabelCodes: string = "";
    /**DNS-имя или IP-адрес сервера ОФД. */
    OfdAddress: string = "";
    /**TCP-порт сервера ОФД. */
    OfdPort: number = 0;
    /**Номер автоматического устройства для расчётов (для автоматов / АС). */
    AutomaticNumber: string = "";
    /**Адрес электронной почты отправителя чека (тег 1117). */
    SenderEmail: string = "";
    /**Причина перерегистрации ККТ. */
    /**Для первичной регистрации может не требоваться. */
    ReasonCode?: FiscalizationReasonCode;
    /**Хост ИСМ (информационная система маркировки), если используется маркировка. */
    IsmHost: string = "";
    /**Порт ИСМ. */
    IsmPort: number = 0;
    /**Адрес сайта ФНС. Пример: "nalog.ru". */
    FnsUrl: string = "";
    /**ИНН оператора фискальных данных (ОФД). */
    OfdVatin: string = "";
    /**Наименование оператора фискальных данных (ОФД). */
    OfdName: string = "";
    /**Признаки агента — числовые коды через запятую. */
    AgentTypes: string = "";
    /**true — ККТ применяется для формирования АС БСO. */
    IsBsoSign: boolean = false;
    /**true — ККТ применяется при продаже маркированных товаров. */
    IsMarking: boolean = false;
    /**true — ККТ применяется при осуществлении ломбардной деятельности. */
    IsPawnshop: boolean = false;
    /**true — ККТ применяется при осуществлении страховой деятельности. */
    IsAssurance: boolean = false;
    /**true — ККТ применяется в автоматическом режиме. */
    IsAutomatic: boolean = false;
    /**true— ККТ применяется в составе торгового автомата (вендинг). */
    IsVending: boolean = false;
    /**true — в автоматическом устройстве установлен принтер чеков. */
    IsAutomaticPrinter: boolean = false;
    /**true — расчёты ведутся только в сети Интернет (без выдачи бумажного чека покупателю на месте). */
    IsOnline: boolean = false;
    /**true — ККТ применяется при проведении лотерей. */
    IsLottery: boolean = false;
    /**true — ККТ применяется при проведении азартных игр. */
    IsGambling: boolean = false;
    /**true — ККТ применяется при продаже подакцизных товаров. */
    IsExcisable: boolean = false;
    /**true — ККТ применяется при оказании услуг. */
    IsService: boolean = false;
    /**true — данные в ФН шифруются. */
    IsEncrypted: boolean = false;
    /**true — автономный режим (без передачи данных в ОФД). */
    IsOffline: boolean = false;
    /**true — ККТ применяется при оказании услуг общественного питания. */
    IsCateringServices: boolean = false;
    /**true — ККТ применяется при оптовой торговле. */
    IsWholesaleTrade: boolean = false;
    /**Адрес места осуществления расчётов (улица, дом и т.п.). */
    SaleAddress: string = "";
    /**Место расчётов (краткое наименование: офис, торговый зал, павильон и т.п.). */
    SaleLocation: string = "";
}