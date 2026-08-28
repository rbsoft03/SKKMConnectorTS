import { Cashier } from "../../dto/Cashier.js";

/**Базовые параметры кассового документа.*/
export class CheckbaseParameters {
    
    /** Имя кассы. */
    DeviceName?: string;

    /** Идентификатор документа. */
    DocId?: string;

    /** Кассир. */
    Cashier?: Cashier;
}