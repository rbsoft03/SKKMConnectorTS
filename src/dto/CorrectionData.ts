import { CorrectionTypes } from "./enums/CorrectionTypes.js";

/** Данные коррекции. */
export class CorrectionData {

    /** Тип коррекции: 0 — самостоятельно, 1 — по предписанию. */
    Type: CorrectionTypes = CorrectionTypes.Самостоятельно;

    /** Описание коррекции. */
    Description: string = "";

    /**Дата совершения корректируемого расчета.*/
    Date: string = new Date().toISOString();

    /** Номер предписания налогового органа. */
    Number: string = "";
}