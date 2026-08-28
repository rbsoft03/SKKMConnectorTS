import { KktLicense } from "./KktLicense.js";

/** Описание ККМ. */
export class Device {

    /** Часовая зона. */
    TimeZone: number = 0;

    /** Фискальный режим. */
    IsFiscal: boolean = false;

    /** Ширина чековой ленты. */
    LineLength: number = 0;

    /** Ширина чековой ленты в пикселях. */
    LineLengthPixels: number = 0;

    /** Версия ФФД. */
    FfdVersion?: string;

    /** Версия ФФД ФН. */
    FnFfdVersion?: string;

    /** Тип устройства. */
    DeviceClass: number = 0;

    /** Название модели. */
    Model?: string;

    /** Заводской номер ККТ. */
    SerialNumber?: string;

    /** Версия прошивки. */
    FirmwareVersion?: string;

    /** Версия конфигурации прошивки устройства. */
    ConfigurationVersion?: string;
    
    /** Массив лицензий ККТ. */
    KktLicenses?: KktLicense[];
}