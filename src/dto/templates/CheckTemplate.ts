import { CheckTemplateDocument } from "./CheckTemplateDocument.js";

/** Шаблон чека, полученный с сервера. */
export class CheckTemplate {
    /** Идентификатор шаблона на сервере. */
    Id: string = "";

    /** Имя шаблона чека. */
    Name: string = "";

    /** Документ шаблона. */
    Document?: CheckTemplateDocument;
}