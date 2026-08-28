import { TextString } from "./TextString.js";
import { BarcodeLine } from "../../dto/positions/BarcodeLine.js";
import { PictureLine } from "../../dto/positions/PictureLine.js";
import { SeparatorLine } from "../../dto/positions/SeparatorLine.js";

/**Строка нефискального документа.*/
export class DocPosition {
    
    /** Печать текстовой строки. */
    TextString?: TextString;

    /** Печать штрихкода. */
    Barcode?: BarcodeLine;

    /** Печать картинки (Base64). */
    Picture?: PictureLine;

    /** Горизонтальная разделительная линия на всю ширину чека. */
    SeparatorLine?: SeparatorLine;
}