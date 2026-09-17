import { CheckItem } from "./CheckItem.js";
import { CheckCustomer } from "./CheckCustomer.js";
import { QrCheckData } from "./QrCheckData.js";
import { CheckPayments } from "./CheckPayments.js";
import { DocumentHeader } from "./DocumentHeader.js";
import { CorrectionData } from "../CorrectionData.js";
import { Device } from "./Device.js";
import { ResShiftTotal } from "./ResShiftTotal.js";

/** Сохранённый документ с сервера. */
export class CheckDocument {
    /** Позиции чека. */
    CheckItems?: CheckItem[];

    /** Подтверждён в ФН. */
    TrustedInFn: boolean = false;

    /** Фискальный документ. */
    IsFiscal: boolean = false;

    /** Сдача. */
    Change: number = 0;

    /** Сумма с учётом скидки. */
    Sum: number = 0;

    /** Признак применения ККТ при осуществлении расчёта в безналичном порядке в сети «Интернет». */
    OperationOnline: boolean = false;

    /** Номер телефона или электронная почта клиента. */
    ClientContact?: string;

    /** Сведения о покупателе (клиенте). */
    CustomerDetail?: CheckCustomer;

    /** Данные для отображения QR-кода чека. */
    QrData?: QrCheckData;

    /** Оплаты. */
    Payments?: CheckPayments;

    /** Заголовок документа. */
    DocumentHeader?: DocumentHeader;

    /** Регистрация чека без печати на ленте. */
    Electronically: boolean = false;

    /** Код налогообложения (СНО): 0 — OSN, 1 — USN, 2 — USND_R, 3 — ENVD, 4 — ESN, 5 — PSN. */
    TaxType: number = 0;

    /** Часовая зона: 0 — авто; 1 — МСК-1 / UTC+2; … 11 — МСК+9 / UTC+12. */
    TimeZone: number = 0;

    /** Данные коррекции (чеки коррекции 1.2 и 1.05). */
    CorrectionData?: CorrectionData;

    /** Дополнительный реквизит чека (тег 1192). */
    AdditionalAttribute?: string;

    /** Номер сессии. Используется для GET check/list. */
    ShiftNumber: number = 0;

    /** Номер фискального документа. */
    DocNumber: number = 0;

    /** Номер фискального документа за смену. */
    DocNumberInShift: number = 0;

    /** Фискальный признак документа. */
    FiscalSign?: string;

    /** Серийный номер фискального накопителя. */
    Fn?: string;

    /** Время регистрации операции по часам ККМ. */
    FiscalDate: string = new Date().toISOString();

    /** Имя кассира. */
    CashierName?: string;

    /** ИНН кассира. */
    CashierVatin?: string;

    /** Адрес проведения расчётов. */
    SaleAddress?: string;

    /** Место проведения расчётов. */
    SaleLocation?: string;

    /** Версия ФФД. */
    FfdVersion?: string;

    /** Структура значений тегов документа. */
    Tlv?: string;

    /** Тип чека. */
    TaskType: number = 0;

    /** Идентификатор документа. */
    DocId?: string;

    /** Дата создания документа. */
    Date: string = new Date().toISOString();

    /** Идентификатор терминала, с которого пришёл документ. */
    TerminalId?: string;

    /** Имя устройства. */
    DeviceName?: string;

    /** Пул, который назначен чеку. */
    PoolId?: string;

    /** Результат обработки. */
    ResultCode: number = 0;

    /** Описание результата. */
    ResultDescription?: string;

    /** Признак удачного завершения обработки. */
    Processed: boolean = false;

    /** Версия сервера ККМ. */
    ServerVersion?: string;

    /** Сведения о ККТ на момент документа. */
    DeviceInfo?: Device;

    /** Сменные итоги (X/Z-отчёт). */
    ShiftTotal?: ResShiftTotal;

    /** Количество аннулирований (X/Z-отчёт). */
    AnullatesCount: number = 0;

    /** Сумма НДС 0% (коррекция 1.05). */
    TaxSum0: number = 0;

    /** Сумма НДС 5% (коррекция 1.05). */
    TaxSum5: number = 0;

    /** Сумма НДС 7% (коррекция 1.05). */
    TaxSum7: number = 0;

    /** Сумма НДС 10% (коррекция 1.05). */
    TaxSum10: number = 0;

    /** Сумма НДС 18% (коррекция 1.05). */
    TaxSum18: number = 0;

    /** Сумма НДС 20% (коррекция 1.05). */
    TaxSum20: number = 0;

    /** Сумма НДС 22% (коррекция 1.05). */
    TaxSum22: number = 0;

    /** Сумма без НДС (коррекция 1.05). */
    TaxSumNone: number = 0;

    /** Сумма НДС 5/105 (коррекция 1.05). */
    TaxSum105: number = 0;

    /** Сумма НДС 7/107 (коррекция 1.05). */
    TaxSum107: number = 0;

    /** Сумма НДС 10/110 (коррекция 1.05). */
    TaxSum110: number = 0;

    /** Сумма НДС 18/118 (коррекция 1.05). */
    TaxSum118: number = 0;

    /** Сумма НДС 20/120 (коррекция 1.05). */
    TaxSum120: number = 0;

    /** Сумма НДС 22/122 (коррекция 1.05). */
    TaxSum122: number = 0;
}