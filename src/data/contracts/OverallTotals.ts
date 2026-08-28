import { ShiftCounters } from "../../dto/results/ShiftCounters.js";

/**Необнуляемые счётчики ККТ.*/
export class OverallTotals {
    
    /** Счётчики фискальных операций. */
    Counters?: ShiftCounters;
}