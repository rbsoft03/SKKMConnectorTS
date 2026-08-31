/**Тип чека*/
export enum CheckType{

    /**Текст.*/
    Text  = 0,

    /**Продажа (приход).*/
    Sale = 1,

    /**Возврат (возврат прихода).*/
    SaleReturn = 2,

    /**Покупка (расход).*/
    Purchase = 3,
    
    /**Возврат покупки (возврат расхода).*/
    PurchaseReturn = 4,

    /**Чек коррекции прихода.*/
    CorrectionSale = 5,

    /**Чек коррекции возврата прихода.*/
    CorrectionSaleReturn = 6,

    /**Чек коррекции расхода.*/
    CorrectionPurchase = 7,
    
    /**Чек коррекции возврата расхода.*/
    CorrectionPurchaseReturn = 8,

    /** Слип. */
    Slip = 9,

    /** Фискализация. */
    Fiscalization = 10,

    /** Открытие смены. */
    OpenShift = 11,

    /** Закрытие смены (Z-отчёт). */
    CloseShift = 12,

    /** X-отчёт. */
    ReportX = 13,

    /** Отчёт о состоянии расчётов. */
    ReportSettlement = 14,

    /** Выемка. */
    CashOut = 20,

    /** Внесение. */
    CashIn = 21,

    /** Открытие денежного ящика. */
    OpenCashDrawer = 22,

    /** Копия из ФН. */
    CopyFromFn = 23,

    /** Дубликат документа. */
    DocumentCopy = 24
}