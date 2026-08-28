export class FiscalResult {
    
    /** Время операции. */
    datetime?: string;

    /** Название устройства.*/
    deviceName?: string;

    /** Идентификатор документа.*/
    docId?: string;

    /** Адрес сайта ФНС.*/
    fnsUrl?: string;

    /** Номер фискального накопителя.*/
    fnNumber?: string;

    /** Регистрационный номер ККТ.*/
    rnNumber?: string;

    /** Дата и время документа по часам ФН.*/
    fiscalDatetime?: string;

    /** Фискальный признак документа.*/
    fiscalSign?: string;

    /** Номер смены.*/
    shiftNumber: number = 0;

    /** Номер фискального документа.*/
    fiscalNumber: number = 0;
}