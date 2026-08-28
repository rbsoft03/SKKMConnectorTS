/** Режимы работы ККТ. */
export class FnModes {

    /** Принтер в автомате. */
    PrinterAutomatic: boolean = false;

    /** Автономный режим (без передачи в ОФД). */
    OfflineMode: boolean = false;

    /** Признак расчетов за услуги. */
    ServiceSign: boolean = false;

    /** Признак формирования БСО. */
    BsoSign: boolean = false;

    /** ККТ для расчетов только в Интернет. */
    CalcOnlineSign: boolean = false;

    /** Шифрование данных. */
    DataEncryption: boolean = false;

    /** Продажа подакцизного товара. */
    SaleExcisableGoods: boolean = false;
    
    /** Признак проведения азартных игр. */
    SignOfGambling: boolean = false;

    /** Признак проведения лотереи. */
    SignOfLottery: boolean = false;

    /** Ломбард. */
    Pawnshop: boolean = false;

    /** Страхование. */
    Assurance: boolean = false;

    /** Продажа маркированного товара. */
    Marking: boolean = false;

    /** Вендинговый автомат. */
    VendingMachine: boolean = false;

    /** Общественное питание. */
    CateringServices: boolean = false;

    /** Оптовая торговля. */
    WholesaleTrade: boolean = false;
    
    /** Автоматический режим. */
    AutomaticMode: boolean = false;
}