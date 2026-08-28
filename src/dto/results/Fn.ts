import { Ofd } from "./Ofd.js";
import { Warnings } from "./Warnings.js";
import { FnModes } from "./FnModes.js";

/** Описание фискального накопителя. */
export class Fn {

    /** Количество проведённых фискализаций. */
    FiscalizationsCount: number = 0;

    /** Дата и время последней фискализации. */
    FiscalizationDateTime: string = new Date().toISOString();

    /** Регистрационный номер ККТ (РНМ). */
    RnNumber?: string;

    /** Адрес сайта ФНС, напечатанный на чеке. */
    FnsUrl?: string;

    /** Email отправителя электронных чеков. */
    SenderEmail?: string;

    /** Код систем налогообложения. */
    TaxVariant: number = 0;

    /** Код причины перерегистрации / изменения параметров. */
    ReasonCode: number = 0;

    /** Версия ФФД. */
    FfdVersion?: string;

    /** Заводской номер фискального накопителя. */
    SerialNumber?: string;

    /** Наименование организации. */
    OrganizationName?: string;

    /** ИНН владельца ККТ. */
    Vatin?: string;
    
    /** Дата окончания срока действия ФН. */
    ValidityDate: string = new Date().toISOString();

    /** Адрес расчётов. */
    SaleAddress?: string;

    /** Место расчётов. */
    SaleLocation?: string;

    /** Признак агента (тег 1057). */
    SignOfAgent: number = 0;

    /** Номер автомата. */
    AutomaticNumber?: string;

    /** Оператор фискальных данных. */
    Ofd?: Ofd;

    /** Предупреждения ФН. */
    Warnings?: Warnings;

    /** Разрешённые режимы работы ККТ. */
    Modes?: FnModes;
}