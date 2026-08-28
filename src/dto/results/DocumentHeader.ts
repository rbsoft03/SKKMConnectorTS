/** Заголовок фискального документа. */
export class DocumentHeader {
    
    /** Название организации. */
    OrganizationInfo?: string;

    /** Заводской номер ККТ. */
    SerialNumber?: string;

    /** ИНН организации. */
    Vatin?: string;

    /** Кассир. */
    Cashier?: string;

    /** Регистрационный номер ККТ. */
    RnNumber?: string;

    /** Фискальный накопитель. */
    Fn?: string;

    /** Адрес сайта уполномоченного органа (ФНС) в сети «Интернет». */
    FnsUrl?: string;

    /** Номер смены. */
    ShiftNumber: number = 0;

    /** Номер фискального документа. */
    DocNumber: number = 0;

    /** Фискальный признак документа. */
    FiscalSign?: string;

    /** Наименование провайдера ОФД. */
    OfdOrganizationName?: string;

    /** ИНН провайдера ОФД. */
    OfdVatin?: string;
}