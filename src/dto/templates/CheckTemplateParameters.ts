import { CheckTemplateDocument } from "./CheckTemplateDocument.js";

/** Параметры создания или изменения шаблона чека. */
export class CheckTemplateParameters {
    /**
     * Имя шаблона чека. Уникальный идентификатор на сервере.
     * Разрешены символы a-z, A-Z, 0-9, _, -, (, ). Пробелы запрещены.
     */
    Name: string = "";

    /** Документ шаблона. */
    Document?: CheckTemplateDocument;
}