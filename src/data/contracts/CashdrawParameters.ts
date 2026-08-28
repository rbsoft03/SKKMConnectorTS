import { CheckbaseParameters } from "./CheckbaseParameters.js";

/**Внесения/выемки наличных.*/
export class CashdrawParameters extends CheckbaseParameters {
    
    /** Сумма внесения или выемки. */
    Sum: number = 0;
}