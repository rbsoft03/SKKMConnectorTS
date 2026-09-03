import type { FiscalizationOperationType } from "../enums/FiscalizationOperationType.js";


/** Результат фискализации. */
export class FiscalizationDocument {
    /**Тип выполненной операции.  */
    OperationType?: FiscalizationOperationType; 
    /**Регистрационный номер ККТ.  */
    RnNumber: string = "";
    /**Коды систем налогообложения.  */
    TaxationSystems: string = "";
    /**ИНН организации.  */
    Vatin: string = "";
    /**Название организации.  */
    CompanyName: string = "";
    /**Версия ФФД ККТ.  */
    FfdVersionKkt: string = "";
    /**Версия ФФД ФН.  */
    FfdVersionFn: string = "";
    /**Признак фискального режима.  */
    IsFiscal: boolean = false;
    /**Идентификатор документа фискализации.  */
    DocId: string = "";
    /**Название устройства.  */
    DeviceName: string = "";
    /**Номер смены.  */
    ShiftNumber: number = 0;
    /**Номер фискального документа.  */
    DocNumber: number = 0;
    /**Фискальный признак документа. */
    FiscalSign: string = "";
}