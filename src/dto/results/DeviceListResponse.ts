import { DeviceType } from "../enums/DeviceType.js";

/** Элемент списка ККТ. */
export class DeviceListResponse {

    /** Имя устройства. */
    DeviceName?: string;

    /** Тип драйвера. */
    Driver: DeviceType = DeviceType.Shtrih;

    /** Имя пула, в который входит устройство. */
    Pool?: string;
    
    /** Описание статуса устройства. */
    DeviceStatusDescription?: string;
}