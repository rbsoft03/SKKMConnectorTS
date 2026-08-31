import { Position } from "./Position.js";
import { Agent } from "./Agent.js";
import { Vendor } from "./Vendor.js";
import { Marking } from "./Marking.js";
import { FractionalQuantity } from "./FractionalQuantity.js";
import { Industry } from "./Industry.js";

/** Фискальная строка чека. */
export class FiscalLine extends Position {

    /** Наименование товара*/
    Name: string = "";

    /** Код товара*/
    ProductCode?: string;

    /** Количество товара*/
    Quantity: number = 1;

    /** Цена единицы товара с учетом скидок/наценок*/
    Price: number = 0;

    /** Конечная сумма по позиции чека с учетом всех скидок/наценок*/
    Sum: number = 0;

    /** Сумма скидок и наценок*/
    DiscountSum: number = 0;

    /** Ставка НДС. Обязательна: сервер отклоняет позицию без ставки*/
    Tax: string = "";

    /** Сумма НДС за предмет расчета*/
    TaxSum: number = 0;

    /** Отдел, по которому ведется продажа*/
    Department: number = 0;

    /** Признак способа расчета*/
    SignMethodCalculation?: number;

    /** Признак предмета расчета*/
    SignCalculationObject?: number;
    /** Единица измерения предмета расчета*/
    MeasurementUnit?: string;

    /** Мера количества предмета расчета*/
    MeasureOfQuantity?: number;

    /** Сумма акциза с учетом копеек*/
    ExciseAmount?: number;

    /** Цифровой код страны происхождения товара*/
    CountryOfOrigin?: string;

    /** Регистрационный номер таможенной декларации*/
    CustomsDeclaration?: string;

    /** Признак агента по предмету расчета*/
    SignSubjectCalculationAgent?: number;

    /** Данные агента*/
    AgentData?: Agent;

    /** Данные поставщика*/
    Vendor?: Vendor;

    /** Данные кода товарной номенклатуры*/
    GoodCodeData?: Marking;

    /** Код контрольной марки*/
    MarkingCode?: string;

    /** Описание частичного выбытия*/
    FractionalQuantity?: FractionalQuantity;

    /** Отраслевой реквизит*/
    IndustryAttribute?: Industry;
    
    /** Дополнительный реквизит предмета расчета*/
    AdditionalAttribute?: string;
}