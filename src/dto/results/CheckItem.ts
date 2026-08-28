/** Позиция сохранённого чека. */
export class CheckItem {
    
    /** Название. */
    Name?: string;

    /** Количество товара. */
    Quantity: number = 0;

    /** Цена позиции. */
    Price: number = 0;

    /** Сумма с учётом скидки. */
    Sum: number = 0;

    /** Отдел. */
    Department?: number;

    /** Фискальный режим. */
    IsFiscal: boolean = false;

    /** Ставка НДС. */
    TaxValue: number = 0;

    /** Сумма НДС. */
    TaxSum: number = 0;

    /** Признак способа расчёта. */
    PaymentMode: number = 0;

    /** Признак предмета расчёта (тег 1030 / 1212). */
    ItemType: number = 0;

    /** Сумма акциза с учётом копеек, включённая в стоимость предмета расчёта. */
    ExciseAmount?: number;

    /** Мера количества предмета расчёта. */
    MeasureOfQuantity?: number;

    /** Скидка (>0) или наценка (<0). */
    DiscountInfoValue: number = 0;

    /** Дополнительный реквизит предмета расчёта. */
    AdditionalAttribute?: string;
}