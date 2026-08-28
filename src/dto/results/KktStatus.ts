import { ShiftState } from "../enums/ShiftState.js";
import { Warnings } from "./Warnings.js";

/** Состояние ККТ. */
export class KktStatus {

    /** Присутствует ли фискальный накопитель. */
    IsFnPresent: boolean = false;

    /** Находится ли фискальный накопитель в состоянии ошибки. */
    IsFnError: boolean = false;

    /** Доступна ли информационная система маркировки. */
    IsIsmDisconnected: boolean = false;

    /** Доступен ли оператор фискальных данных. */
    IsOfdDisconnected: boolean = false;

    /** Предупреждения ФН. */
    Warnings?: Warnings;

    /** Номер смены. */
    ShiftNumber: number = 0;

    /** Номер фискального документа. */
    DocNumber: number = 0;

    /** Фискальный режим. */
    IsFiscal: boolean = false;

    /** Смена открыта. */
    IsShiftOpened: boolean = false;

    /** Смена истекла. */
    IsShiftExpired: boolean = false;

    /** Время получения данных. */
    ComputerTime: string = new Date().toISOString();

    /** Время в часах устройства. */
    DeviceTime: string = new Date().toISOString();

    /** Открыт денежный ящик. */
    IsDrawerOpened: boolean = false;

    /** Наличие чековой ленты. */
    IsCheckPaperPresent: boolean = false;

    /** Открыта ли крышка. */
    IsCoverOpened: boolean = false;

    /** Аккумулятор разряжен. */
    IsBatteryLow: boolean = false;

    /** Открытый документ. */
    IsOpenDocument: boolean = false;
    
    /** Ширина чековой ленты. */
    LineLength: number = 0;

    /**
     * Состояние смены по флагам: закрыта / открыта / истекла.
     */
    get ShiftState(): ShiftState {
        if (this.IsShiftExpired) return ShiftState.Expired;
        if (this.IsShiftOpened) return ShiftState.Opened;
        return ShiftState.Closed;
    }
}