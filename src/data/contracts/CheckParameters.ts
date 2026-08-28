import { CheckbaseParameters } from "./CheckbaseParameters.js";
import { Customer } from "../../dto/Customer.js";
import { Industry } from "../../dto/positions/Industry.js";
import { UserAttribute } from "../../dto/UserAttribute.js";
import { OperationalAttribute } from "../../dto/OperationalAttribute.js";
import { ElectronicPayment } from "../../dto/ElectronicPayment.js";
import { Agent } from "../../dto/positions/Agent.js";
import { Vendor } from "../../dto/positions/Vendor.js";
import { Payments } from "../../dto/Payments.js";
import { ApiPosition } from "./ApiPosition.js";

/**Параметры для печати чека или чека коррекции 1.2.*/
export class CheckParameters extends CheckbaseParameters {
    
    /** Тип чека. */
    PaymentType: number = 0;

    /** Код системы налогообложения. */
    TaxVariant: number = 0;

    /** Сведения о покупателе (клиенте). */
    Customer?: Customer;

    /** Место проведения расчетов. */
    SaleLocation?: string;

    /** Адрес проведения расчетов. */
    SaleAddress?: string;

    /** Адрес электронной почты отправителя чека. */
    SenderEmail?: string;

    /** Признак применения ККТ при осуществлении расчета в безналичном порядке в сети «Интернет». */
    OperationOnline?: boolean;

    /** Отраслевой реквизит чека. */
    IndustryAttribute?: Industry;

    /** Дополнительный реквизит пользователя. */
    UserAttribute?: UserAttribute;

    /** Операционный реквизит чека. */
    OperationalAttribute?: OperationalAttribute;

    /** Сведения об оплате безналичными. */
    ElectronicPaymentInfo?: ElectronicPayment[];

    /** Формирование чека только в электронном виде. */
    Electronically: boolean = false;

    /**
     * Номер часовой зоны места расчётов.
     * Если поле не указано, используется значение из поля «Часовая зона» в настройках ККТ.
     */
    TimeZone?: number;

    /** Текст для печати перед товарной частью. */
    TextBefore?: string;

    /** Текст для печати после товарной части чека. */
    TextAfter?: string;

    /** Дополнительный реквизит чека (БСО), тег 1192. */
    AdditionalAttribute?: string;

    /** Признак агента. */
    AgentSign?: number;

    /** Данные агента. */
    AgentData?: Agent;

    /** Данные поставщика. */
    Vendor?: Vendor;

    /** Оплаты. */
    Payments?: Payments;

    /** Товары. */
    Positions?: ApiPosition[];
}