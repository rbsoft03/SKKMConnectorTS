import { CheckbaseParameters } from "./CheckbaseParameters.js";

/** Тело запроса фискализации ККТ. */
export class FiscalizationRequest extends CheckbaseParameters {

    /** Регистрационный номер ККТ. */
    RnNumber?: string;

    /** Коды систем налогообложения через запятую. */
    TaxationSystems?: string;

    /** ИНН организации. */
    Vatin?: string;

    /** Название организации. */
    CompanyName?: string;

    /** Заводской номер ФН. */
    Fn?: string;

    /** Версия ФФД ККТ. */
    FfdVersionKkt?: string;

    /** Версия ФФД ФН. */
    FfdVersionFn?: string;

    /** Коды причин изменения сведений о ККТ. */
    RegistrationLabelCodes?: string;

    /** Адрес ОФД. */
    OfdAddress?: string;

    /** Порт ОФД. */
    OfdPort?: number;

    /** Номер автоматического устройства для расчётов. */
    AutomaticNumber?: string;

    /** Email отправителя чека. */
    SenderEmail?: string;

    /** Код причины перерегистрации. */
    ReasonCode?: number;

    /** Хост ИСМ. */
    IsmHost?: string;

    /** Порт ИСМ. */
    IsmPort?: number;

    /** Адрес сайта ФНС. */
    FnsUrl?: string;

    /** ИНН ОФД. */
    OfdVatin?: string;

    /** Название ОФД. */
    OfdName?: string;

    /** Коды признаков агента через запятую. */
    AgentTypes?: string;

    /** Признак формирования АС БСО. */
    IsBsoSign?: boolean;

    /** Признак торговли маркированными товарами. */
    IsMarking?: boolean;

    /** Признак ломбардной деятельности. */
    IsPawnshop?: boolean;

    /** Признак страховой деятельности. */
    IsAssurance?: boolean;

    /** Признак автоматического режима. */
    IsAutomatic?: boolean;

    /** Признак применения в торговом автомате. */
    IsVending?: boolean;

    /** Признак установки принтера в автомате. */
    IsAutomaticPrinter?: boolean;

    /** Признак расчётов только в интернете. */
    IsOnline?: boolean;

    /** Признак проведения лотерей. */
    IsLottery?: boolean;

    /** Признак проведения азартных игр. */
    IsGambling?: boolean;

    /** Признак продажи подакцизных товаров. */
    IsExcisable?: boolean;

    /** Признак расчётов за услуги. */
    IsService?: boolean;

    /** Признак шифрования данных. */
    IsEncrypted?: boolean;

    /** Признак автономного режима. */
    IsOffline?: boolean;

    /** Признак общественного питания. */
    IsCateringServices?: boolean;

    /** Признак оптовой торговли. */
    IsWholesaleTrade?: boolean;

    /** Адрес расчётов. */
    SaleAddress?: string;

    /** Место расчётов. */
    SaleLocation?: string;
}