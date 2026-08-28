import { CheckbaseParameters } from "./CheckbaseParameters.js";
import { CorrectionData } from "../../dto/CorrectionData.js";
import { Payments } from "../../dto/Payments.js";

/**Тело запроса печати чека коррекции ФФД 1.05.*/
export class Correction105Parameters extends CheckbaseParameters {
    
    /** Тип чека. */
    PaymentType: number = 0;

    /** Код системы налогообложения. */
    TaxVariant: number = 0;

    /** Дополнительный реквизит чека (БСО), тег 1192. */
    AdditionalAttribute?: string;

    /** Данные коррекции. */
    CorrectionData?: CorrectionData;

    /** Список оплаты. */
    Payments?: Payments;

    /** Сумма расчёта по ставке НДС 0%. */
    SumTax0?: number;

    /** Сумма НДС чека по ставке 5%. */
    SumTax5?: number;

    /** Сумма НДС чека по ставке 7%. */
    SumTax7?: number;

    /** Сумма НДС чека по ставке 10%. */
    SumTax10?: number;

    /** Сумма НДС чека по ставке 18%. */
    SumTax18?: number;

    /** Сумма НДС чека по ставке 20%. */
    SumTax20?: number;

    /** Сумма НДС чека по ставке 22%. */
    SumTax22?: number;

    /** Сумма расчёта без НДС. */
    SumTaxNone?: number;

    /** Сумма НДС чека по ставке 5/105. */
    SumTax105?: number;

    /** Сумма НДС чека по ставке 7/107. */
    SumTax107?: number;

    /** Сумма НДС чека по расч. ставке 10/110. */
    SumTax110?: number;

    /** Сумма НДС чека по расч. ставке 18/118. */
    SumTax118?: number;

    /** Сумма НДС чека по расч. ставке 20/120. */
    SumTax120?: number;

    /** Сумма НДС чека по расч. ставке 22/122. */
    SumTax122?: number;
}