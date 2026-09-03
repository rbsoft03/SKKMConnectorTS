import type { CheckType } from "../enums/CheckType.js";

/** Элемент списка шаблонов чека. */
export class CheckTemplateListItem {
    /** Имя шаблона чека. */
    Name: string = "";

    /** Тип чека шаблона. */
    TaskType?: CheckType;
}