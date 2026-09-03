/** Краткая информация об операции. */
export class OperationListItem {
    /**Идентификатор документа.  */
    DocId: string = "";
    /**Идентификатор документа-основания. */
    BaseDocId: string = "";
    /**Идентификатор запроса.  */
    RequestId: string = "";
    /**Идентификатор терминала. */
    TerminalId: string = "";
    /**Имя устройства.  */
    DeviceName: string = "";
    /**Идентификатор пула. */
    PoolId: string = "";
    /**Дата операции. */
    Date: string = "";
    /**Дата создания записи. */
    CreatedAt: string = "";
    /**Дата последнего обновления. */
    UpdateAt: string = "";
    /**Тип задания.  */
    TaskType: number = 0;
    /** Наименование типа задания.  */
    TaskName: string = "";
    /**Сумма операции. */
    Sum: number = 0;
    /**Номер смены.  */
    SessionNumber: number = 0;
    /**Номер документа в смене.  */
    DocNumberInShift: number = 0;
    /**Номер фискального документа.  */
    DocNumber: number = 0;
    /**Дата документа по ФН.  */
    FnDate: string = "";
    /**Фискальный признак документа.  */
    FiscalSign: string = "";
    /**Номер фискального накопителя.  */
    Fn: string = "";
    /**Контакт покупателя. */
    ClientContact: string = "";
    /**Имя кассира. */
    CashierName: string = "";
    /**Регистрационный номер ККТ. */
    RnKKT: string = "";
    /**Заводской номер ККТ.  */
    ZnKKT: string = "";
    /**Код результата (0 — успех). */
    ResultCode: number = 0;
    /**Описание результата. */
    ResultDescription: string = "";
    /**Признак успешной обработки операции.  */
    Processed: boolean = false;
}