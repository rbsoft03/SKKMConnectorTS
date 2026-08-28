import { CashDrawer } from "./CashDrawer.js";
import { ShiftIncome } from "./ShiftIncome.js";
import { ShiftCounters } from "./ShiftCounters.js";

/** Итоги текущей кассовой смены. */
export class ResShiftTotal {

    /** Номер смены. */
    ShiftNumber: number = 0;

    /** Денежный ящик: остаток наличных и число операций. */
    CashDrawer?: CashDrawer;

    /** Внесения за смену. */
    ShiftIncome?: ShiftIncome;

    /** Выемки за смену. */
    ShiftOutcome?: ShiftIncome;
    
    /** Счетчики фискальных операций за смену. */
    Counters?: ShiftCounters;
}