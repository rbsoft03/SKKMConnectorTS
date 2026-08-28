import { CheckbaseParameters } from "./CheckbaseParameters.js";
import { DocPosition } from "./DocPosition.js";

/** Тело запроса печати нефискального документа. */
export class DocumentParameters extends CheckbaseParameters {
    
    /** Строки документа. */
    Positions?: DocPosition[];
}