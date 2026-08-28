import { ShiftState } from "../enums/ShiftState.js";
import { Backlog } from "./Backlog.js";

/** Краткий статус смены и очереди ОФД. */
export class ResponseCurrentStatus {

    /** Номер смены. */
    ShiftNumber: number = 0;

    /** Номер последнего фискального документа. */
    CheckNumber: number = 0;

    /** Состояние смены: 1 — закрыта, 2 — открыта, 3 — истекла. */
    ShiftState: ShiftState = ShiftState.Closed;
    
    /** Статус обмена данными с ОФД. */
    Backlog?: Backlog;
}