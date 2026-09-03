import type { Constructor } from "./Constructor.js";
import { Industry } from "../dto/positions/Industry.js";
import { UserAttribute } from "../dto/UserAttribute.js";
import { OperationalAttribute } from "../dto/OperationalAttribute.js";
import { ElectronicPayment } from "../dto/ElectronicPayment.js";
import { Agent } from "../dto/positions/Agent.js";
import { Vendor } from "../dto/positions/Vendor.js";
import { Customer } from "../dto/Customer.js";
import { Payments } from "../dto/Payments.js";
import { Position } from "../dto/positions/Position.js";
import { CorrectionData } from "../dto/CorrectionData.js";
import { Correction105Taxes } from "../dto/Correction105Taxes.js";
import { CheckType } from "../dto/enums/CheckType.js";
import { TaxSystem } from "../dto/enums/TaxSystem.js";

/** Форматирует дату как гггг-мм-дд . */
function toDateOnly(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function today(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function todayMinusDays(days: number): Date {
    const d = today();
    d.setDate(d.getDate() - days);
    return d;
}

/**
 * Входные свойства запроса: чек, коррекция, наличные, слип, картинки, маркировка.
 */
export function WithCheckInput<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        // Документы / смены

        /** Идентификатор документа (docId). */
        DocumentId = "";

        /** Фискальный признак документа. */
        FiscalSign = "";

        /** Номер смены. */
        ShiftNumber = 0;

        /** Номер фискального документа. */
        CheckNumber = 0;

        /** Начало даты отбора списка отчётов (формат yyyy-MM-dd). */
        ShiftsFrom: string = toDateOnly(todayMinusDays(7));

        /** Конец даты отбора списка отчётов (формат yyyy-MM-dd). */
        ShiftsTo: string = toDateOnly(today());

        // Наличные

        /** Сумма внесения или выемки. */
        CashAmount = 0;

        // Картинки

        /** Название изображения. */
        PictureName = "";

        /** Изображение, закодированное в Base64. */
        PictureBase64 = "";

        /** Выравнивание изображения при печати. */
        PictureAlignment = 2;

        // Слип

        /** Текст нефискального документа. */
        TextForPrint = "";

        // Чек

        /** Тип чека / задания. В GetOperationLast уходит как tasktype. */
        PaymentType: number = CheckType.Sale;

        /** Только обработанные операции. Параметр isProcessed в GetOperationLast. */
        IsProcessed = false;

        /** Система налогообложения (СНО). */
        TaxVariant: number = TaxSystem.ОСН;

        /** Часовая зона. */
        TimeZone: number | undefined = undefined;

        /** Чек только в электронном виде (без печати на бумаге). */
        /** true — не печатать; для обычной печати оставляйте false. */
        Electronically = false;

        /** Текст для печати перед товарной частью. */
        TextBefore = "";

        /** Текст для печати после товарной части чека. */
        TextAfter = "";

        /** Место проведения расчётов. */
        SaleLocation = "";

        /** Адрес проведения расчётов. */
        SaleAddress = "";

        /** Адрес электронной почты отправителя чека. */
        SenderEmail = "";

        /** Признак применения ККТ при осуществлении расчета в безналичном порядке в сети «Интернет». */
        OperationOnline = false;

        /** Дополнительный реквизит чека (БСО), тег 1192. */
        AdditionalAttribute = "";

        /** Отраслевой реквизит чека. */
        IndustryAttribute: Industry | undefined = undefined;

        /** Дополнительный реквизит пользователя. */
        UserAttribute: UserAttribute | undefined = undefined;

        /** Операционный реквизит чека. */
        OperationalAttribute: OperationalAttribute | undefined = undefined;

        /** Сведения об оплате безналичными.*/
        ElectronicPayments: ElectronicPayment[] = [];

        /** Признак агента. */
        AgentSign: number | undefined = undefined;

        /** Данные агента. */
        Agent: Agent | undefined = undefined;

        /** Данные поставщика. */
        Vendor: Vendor | undefined = undefined;

        /** Сведения о покупателе (клиенте). */
        Customer: Customer | undefined = undefined;

        /** Оплаты. */
        Payments: Payments = new Payments();

        /** Товары. */
        Positions: Position[] = [];

        // Коррекция

        /** Данные коррекции. */
        CorrectionData: CorrectionData | undefined = undefined;

        /** Суммы НДС по ставкам для чека коррекции ФФД 1.05. */
        Correction105Taxes: Correction105Taxes | undefined = undefined;

        // Маркировка (вход)

        /** Код маркировки в кодировке Base64. */
        MarkingCode = "";

        /** Планируемый статус товара. */
        PlannedStatus = 1;

        /** Количество товара. */
        MarkingQuantity = 1;

        /** Мера количества предмета расчета. */
        MeasureOfQuantity = 0;

        /** Числитель дробного количества товара. */
        FractionalQuantityNumerator = 0;

        /** Знаменатель дробного количества товара. */
        FractionalQuantityDenominator = 0;

        /** Не отправлять результат проверки на сервер ОИСМ. */
        NotSendToServer = false;

        /** Признак ожидания ответа ОИСМ. */
        WaitForResult = false;

        /** Уникальный код запроса КМ. */
        RequestKmGuid = "";

        /** Признак подтверждения кода маркировки. */
        ConfirmationType = 0;
    };
}