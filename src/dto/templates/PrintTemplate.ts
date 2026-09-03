import type { PrintTemplateType } from "../enums/PrintTemplateType.js";
import { TemplateItem } from "./TemplateItem.js";

/** Шаблон печати, полученный с сервера. */
export class PrintTemplate {
    /** Имя шаблона. Уникальный идентификатор на сервере. */
    Name: string = "";

    /** Тип шаблона. */
    Type?: PrintTemplateType;

    /** Строки шаблона (текст, штрихкод, картинка, разделитель). */
    TemplateItems: TemplateItem[] = [];
}