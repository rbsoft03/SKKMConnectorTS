import { PrintLine } from "./PrintLine.js";

/** Элемент шаблона печати. */
export class TemplateItem {
    /** Строка печати: текст, штрихкод, изображение или разделительная линия. */
    PrintLine?: PrintLine;
}