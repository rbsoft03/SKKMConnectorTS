/** Сведения о коде маркировки. */
export class CodeMarkInfo {
    /**Полный код маркировки (КиЗ). */
    Cis: string = "";
    /**Признак валидности структуры кода. */
    Valid: boolean = false;
    /**Код маркировки без крипто-подписи. */
    PrintView: string = "";
    /**Идентификаторы товарных групп. */
    GroupIds: number[] = [];
    /**Результат криптографической проверки кода. */
    Verified: boolean = false;
    /**Признак статуса «В обороте». */
    Realizable: boolean = false;
    /**Признак нанесения кода на упаковку. */
    Utilised: boolean = false;
    /**Признак наличия кода в ГИС МТ. */
    Found: boolean = false;
    /**Код ошибки проверки. */
    ErrorCode: number = 0;
    /**Сообщение об ошибке. */
    Message: string = "";
    /**Признак старта прослеживаемости в товарной группе. */
    IsTracking: boolean = false;
    /**Признак того, что товар с данным кодом уже продан. */
    Sold: boolean = false;
    /**Код товара (GTIN). */
    Gtin: string = "";
    /**Тип упаковки. */
    PackageType: string = "";
    /**ИНН производителя. */
    ProducerInn: string = "";
    /**Признак нахождения продукции в «серой зоне». */
    GrayZone: boolean = false;
    /**Признак блокировки кода по решению ОГВ. */
    IsBlocked: boolean = false;
    /** Признак некорректного (незарегистрированного) GTIN. */
    IsGreyGtin: boolean = false;
    /**Органы государственной власти, установившие блокировку. */
    Ogvs: string[] = [];
    /**Ёмкость КИГУ (количество потенциальных вложений). */
    PackageQuantity: number = 0;
}