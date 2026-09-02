import { Customer } from "../Customer.js";
import { Position } from "../positions/Position.js";
import { CheckItem } from "../results/CheckItem.js";
import { Payments } from "../Payments.js";
import { ElectronicPayment } from "../ElectronicPayment.js";
import { CorrectionData } from "../CorrectionData.js";
import { Industry } from "../positions/Industry.js";
import { UserAttribute } from "../UserAttribute.js";
import { OperationalAttribute } from "../OperationalAttribute.js";
import type { CheckTimeZone } from "../enums/CheckTimeZone.js";

/** Документ шаблона чека. */
export class CheckTemplateDocument {
    /** Тип чека. */
    PaymentType: number = 0;

    /** Система налогообложения. */
    TaxVariant: number = 0;

    /** Часовая зона. */
    TimeZone?: CheckTimeZone;

    /** Признак расчёта в сети Интернет. */
    OperationOnline: boolean = false;

    /** Адрес электронной почты отправителя чека. */
    SenderEmail: string = "";

    /** Адрес проведения расчётов. */
    SaleAddress: string = "";

    /** Место проведения расчётов. */
    SaleLocation: string = "";

    /** Формирование чека только в электронном виде. */
    Electronically: boolean = false;

    /** Покупатель. */
    Customer?: Customer;

    /** Позиции чека. */
    Positions: Position[] = [];

    /** Строки шаблона. */
    CheckItems: CheckItem[] = [];

    /** Оплаты чека. */
    Payments?: Payments;

    /** Электронные платежи. */
    ElectronicPayments: ElectronicPayment[] = [];

    /** Данные коррекции. */
    CorrectionData?: CorrectionData;

    /** Отраслевой реквизит чека. */
    IndustryAttribute?: Industry;

    /** Дополнительный реквизит пользователя. */
    UserAttribute?: UserAttribute;

    /** Операционный реквизит чека. */
    OperationalAttribute?: OperationalAttribute;

    /** Дополнительный реквизит чека (БСО), тег 1192. */
    AdditionalAttribute: string = "";
}