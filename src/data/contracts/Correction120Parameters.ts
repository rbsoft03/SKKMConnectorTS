import { CheckParameters } from "./CheckParameters.js";
import { CorrectionData } from "../../dto/CorrectionData.js";

/**Тело запроса печати чека коррекции ФФД 1.2.*/
export class Correction120Parameters extends CheckParameters {
    
    /** Данные корректировки. */
    CorrectionData?: CorrectionData;
}