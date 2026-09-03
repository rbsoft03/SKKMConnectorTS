import type { ShiftState } from "../enums/ShiftState.js";
import type { Backlog } from "./Backlog.js";
import type { CashDrawer } from "./CashDrawer.js";
import type { FiscalOutputParameters } from "./FiscalOutputParameters.js";

export class FiscalResult {
    
    /** Время операции. */
    Datetime?: string;

    /** Название устройства.*/
    DeviceName?: string;

    /** Идентификатор документа.*/
    DocId?: string;

    /** Адрес сайта ФНС.*/
    FnsUrl?: string;

    /** Номер фискального накопителя.*/
    FnNumber?: string;

    /** Регистрационный номер ККТ.*/
    RnNumber?: string;

    /** Дата и время документа по часам ФН.*/
    FiscalDatetime?: string;

    /** Фискальный признак документа.*/
    FiscalSign?: string;

    /** Номер смены.*/
    ShiftNumber: number = 0;

    /** Номер фискального документа.*/
    FiscalNumber: number = 0;

    /** Сумма наличных в результате операции. */
    CashSum?: number;

    /** Состояние денежного ящика. */
    CashDrawer?: CashDrawer;

    /** Непереданные документы. */
    Backlog?: Backlog;

    /** Дополнительные параметры вывода. */
    OutputParameters?: FiscalOutputParameters;

    /** Состояние смены. */
    ShiftState?: ShiftState;
}