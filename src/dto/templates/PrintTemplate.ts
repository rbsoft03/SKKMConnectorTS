import { TemplateItem } from "./TemplateItem.js";

/** Шаблон печати, полученный с сервера. */
export class PrintTemplate {
    /** Имя шаблона. Уникальный идентификатор на сервере. */
    Name: string = "";

    /** Тип шаблона: 0 — реклама; 1 — строки чека; 2 — шапка или подвал чека. */
    Type: number = 0;

    /** Строки шаблона (текст, штрихкод, картинка, разделитель). */
    TemplateItems: TemplateItem[] = [];
}