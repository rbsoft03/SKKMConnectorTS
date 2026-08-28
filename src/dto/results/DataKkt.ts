import { Fn } from "./Fn.js";
import { Device } from "./Device.js";
import { Driver } from "./Driver.js";
import { KktStatus } from "./KktStatus.js";

/** Общие данные ККТ. */
export class DataKkt {

    /** Версия сервера ККМ. */
    ServerVersion?: string;

    /** Описание фискального накопителя. */
    Fn?: Fn;

    /** Описание ККМ. */
    Device?: Device;

    /** Описание драйвера ККМ. */
    Driver?: Driver;
    
    /** Состояние ККТ. */
    Status?: KktStatus;
}