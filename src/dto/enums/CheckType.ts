/**Тип чека*/
export enum CheckType{

    /**Не используется.*/
    None = 0,

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
    CorrectionPurchaseReturn = 8
}