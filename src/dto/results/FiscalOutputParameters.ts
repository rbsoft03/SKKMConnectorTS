import type { Backlog } from "./Backlog.js";
import type { Warnings } from "./Warnings.js";

/** Вложенный блок OutputParameters в ответе сервера. */
export class FiscalOutputParameters {

	/** Номер чека за смену. */
	NumberOfChecks: number = 0;

	/** Дата и время ККТ. */
	DateTime?: string;

	/** Номер смены. */
	ShiftNumber: number = 0;

	/** Номер фискального документа / чека. */
	CheckNumber: number = 0;

	/** Остаток наличных в ящике. */
	CashBalance: number = 0;

	/** Срок действия ФН. */
	FnValidityDate?: string;

	/** Очередь непереданных документов. */
	Backlog?: Backlog;

	/** Предупреждения ФН. */
	FnWarnings?: Warnings;

	/** Остаток ресурса ФН в днях. */
	ResourcesFn: number = 0;
}
