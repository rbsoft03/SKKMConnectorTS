import type { PrintTemplateType } from "../enums/PrintTemplateType.js";
import { TemplateItem } from "./TemplateItem.js";

/** Параметры создания или изменения шаблона печати. */
export class TemplateParameters {
    /**
     * Имя шаблона. Уникальный идентификатор на сервере.
     * Разрешены символы a-z, A-Z, 0-9, _, -, (, ). Пробелы запрещены.
     */
    Name: string = "";

    /** Тип шаблона. */
    Type?: PrintTemplateType;

    /** Строки шаблона (текст, штрихкод, картинка, разделительная линия). */
    TemplateItems: TemplateItem[] = [];
}