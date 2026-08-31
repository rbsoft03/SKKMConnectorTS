import type { Constructor } from "./Constructor.js";
import { CheckbaseParameters } from "../data/contracts/CheckbaseParameters.js";
import { CheckParameters } from "../data/contracts/CheckParameters.js";
import { Correction120Parameters } from "../data/contracts/Correction120Parameters.js";
import { Correction105Parameters } from "../data/contracts/Correction105Parameters.js";
import { DocumentParameters } from "../data/contracts/DocumentParameters.js";
import { CashdrawParameters } from "../data/contracts/CashdrawParameters.js";
import { ApiPosition } from "../data/contracts/ApiPosition.js";
import { SlipTextParser } from "../data/SlipTextParser.js";
import { Cashier } from "../dto/Cashier.js";
import { Customer } from "../dto/Customer.js";
import { Industry } from "../dto/positions/Industry.js";
import { UserAttribute } from "../dto/UserAttribute.js";
import { OperationalAttribute } from "../dto/OperationalAttribute.js";
import { ElectronicPayment } from "../dto/ElectronicPayment.js";
import { Agent } from "../dto/positions/Agent.js";
import { Vendor } from "../dto/positions/Vendor.js";
import { Payments } from "../dto/Payments.js";
import { Position } from "../dto/positions/Position.js";
import { FiscalLine } from "../dto/positions/FiscalLine.js";
import { TextLine } from "../dto/positions/TextLine.js";
import { BarcodeLine } from "../dto/positions/BarcodeLine.js";
import { SeparatorLine } from "../dto/positions/SeparatorLine.js";
import { PictureLine } from "../dto/positions/PictureLine.js";
import { CorrectionData } from "../dto/CorrectionData.js";
import { Correction105Taxes } from "../dto/Correction105Taxes.js";

interface RequestsRequirements {
    DeviceName: string;
    Cashier: Cashier | undefined;
    PaymentType: number;
    TaxVariant: number;
    Customer: Customer | undefined;
    SenderEmail: string;
    SaleAddress: string;
    SaleLocation: string;
    AgentSign: number | undefined;
    Agent: Agent | undefined;
    Vendor: Vendor | undefined;
    Positions: Position[];
    Payments: Payments;
    ElectronicPayments: ElectronicPayment[];
    TextBefore: string;
    TextAfter: string;
    Electronically: boolean;
    OperationalAttribute: OperationalAttribute | undefined;
    IndustryAttribute: Industry | undefined;
    UserAttribute: UserAttribute | undefined;
    TimeZone: number | undefined;
    OperationOnline: boolean;
    AdditionalAttribute: string;
    CorrectionData: CorrectionData | undefined;
    Correction105Taxes: Correction105Taxes | undefined;
    TextForPrint: string;
    CashAmount: number;
}

/**Одна позиция чека (Dto/Positions) в модель запроса (ApiPosition) по её типу.*/
function toApi(position: Position): ApiPosition {
    if (position instanceof FiscalLine) {
        const api = new ApiPosition();
        api.FiscalString = position;
        return api;
    }
    if (position instanceof TextLine) {
        return textToApi(position);
    }
    if (position instanceof BarcodeLine) {
        const api = new ApiPosition();
        api.Barcode = position;
        return api;
    }
    if (position instanceof SeparatorLine) {
        const api = new ApiPosition();
        api.SeparatorLine = position;
        return api;
    }
    if (position instanceof PictureLine) {
        const api = new ApiPosition();
        api.Picture = position;
        return api;
    }
    throw new Error(
        `Неизвестный тип позиции «${position.constructor.name}». ` +
            "Допустимы FiscalLine, TextLine, BarcodeLine, SeparatorLine, PictureLine."
    );
}

/** Текст с префиксом стиля линии ([dotted], [line], [line,dashed]) уходит как SeparatorLine.*/
function textToApi(text: TextLine): ApiPosition {
    const parsed = SlipTextParser.parseLine(text.Text, text.Font, text.Alignment);
    const api = new ApiPosition();
    if (parsed.TextString !== undefined) api.TextString = parsed.TextString;
    if (parsed.Barcode !== undefined) api.Barcode = parsed.Barcode;
    if (parsed.SeparatorLine !== undefined) api.SeparatorLine = parsed.SeparatorLine;
    if (parsed.Picture !== undefined) api.Picture = parsed.Picture;
    return api;
}

export function WithRequests<TBase extends Constructor<RequestsRequirements>>(Base: TBase) {
    return class extends Base {
        /** Касса и кассир. */
        fillBase(check: CheckbaseParameters): void {
            check.DeviceName = this.DeviceName;
            if (this.Cashier !== undefined) check.Cashier = this.Cashier;
        }

        /** Смена, X/Z-отчёт, отчёт о расчётах, денежный ящик. */
        checkBase(): CheckbaseParameters {
            const check = new CheckbaseParameters();
            this.fillBase(check);
            return check;
        }

        /** Обычный чек. */
        checkBody(): CheckParameters {
            const check = new CheckParameters();
            this.fillCheck(check);
            return check;
        }

        /** Чек коррекции ФФД 1.2. */
        correction120Body(): Correction120Parameters {
            const check = new Correction120Parameters();
            if (this.CorrectionData !== undefined) check.CorrectionData = this.CorrectionData;
            this.fillCheck(check);
            return check;
        }

        /** Заполнение полей чека. */
        fillCheck(check: CheckParameters): void {
            this.fillBase(check);
            check.PaymentType = this.PaymentType;
            check.TaxVariant = this.TaxVariant;
            if (this.Customer !== undefined) check.Customer = this.Customer;
            check.SenderEmail = this.SenderEmail;
            check.SaleAddress = this.SaleAddress;
            check.SaleLocation = this.SaleLocation;
            if (this.AgentSign !== undefined) check.AgentSign = this.AgentSign;
            if (this.Agent !== undefined) check.AgentData = this.Agent;
            if (this.Vendor !== undefined) check.Vendor = this.Vendor;
            check.Positions = this.buildPositions();
            check.Payments = this.Payments;
            if (this.ElectronicPayments.length > 0) {
                check.ElectronicPaymentInfo = this.ElectronicPayments;
            }
            check.TextBefore = this.TextBefore;
            check.TextAfter = this.TextAfter;
            check.Electronically = this.Electronically;
            if (this.OperationalAttribute !== undefined) check.OperationalAttribute = this.OperationalAttribute;
            if (this.IndustryAttribute !== undefined) check.IndustryAttribute = this.IndustryAttribute;
            if (this.UserAttribute !== undefined) check.UserAttribute = this.UserAttribute;
            if (this.TimeZone !== undefined) check.TimeZone = this.TimeZone;
            if (this.OperationOnline) {
                check.OperationOnline = true;
            }
            check.AdditionalAttribute = this.AdditionalAttribute;
        }

        /** Чек коррекции ФФД 1.05. */
        correction105Body(): Correction105Parameters {
            const taxes = this.Correction105Taxes;
            const check = new Correction105Parameters();
            if (this.CorrectionData !== undefined) check.CorrectionData = this.CorrectionData;
            check.PaymentType = this.PaymentType;
            check.TaxVariant = this.TaxVariant;
            check.Payments = this.Payments;
            if (taxes?.SumTaxNone !== undefined) check.SumTaxNone = taxes.SumTaxNone;
            if (taxes?.SumTax0 !== undefined) check.SumTax0 = taxes.SumTax0;
            if (taxes?.SumTax5 !== undefined) check.SumTax5 = taxes.SumTax5;
            if (taxes?.SumTax7 !== undefined) check.SumTax7 = taxes.SumTax7;
            if (taxes?.SumTax10 !== undefined) check.SumTax10 = taxes.SumTax10;
            if (taxes?.SumTax105 !== undefined) check.SumTax105 = taxes.SumTax105;
            if (taxes?.SumTax107 !== undefined) check.SumTax107 = taxes.SumTax107;
            if (taxes?.SumTax110 !== undefined) check.SumTax110 = taxes.SumTax110;
            if (taxes?.SumTax118 !== undefined) check.SumTax118 = taxes.SumTax118;
            if (taxes?.SumTax18 !== undefined) check.SumTax18 = taxes.SumTax18;
            if (taxes?.SumTax20 !== undefined) check.SumTax20 = taxes.SumTax20;
            if (taxes?.SumTax120 !== undefined) check.SumTax120 = taxes.SumTax120;
            if (taxes?.SumTax22 !== undefined) check.SumTax22 = taxes.SumTax22;
            if (taxes?.SumTax122 !== undefined) check.SumTax122 = taxes.SumTax122;
            check.AdditionalAttribute = this.AdditionalAttribute;
            this.fillBase(check);
            return check;
        }

        /** Слип. */
        slipBody(): DocumentParameters {
            const check = new DocumentParameters();
            check.Positions = SlipTextParser.parse(this.TextForPrint);
            this.fillBase(check);
            return check;
        }

        /** Внесение / выемка. */
        cashBody(): CashdrawParameters {
            const check = new CashdrawParameters();
            check.Sum = this.CashAmount;
            this.fillBase(check);
            return check;
        }

        /** Позиции чека в модель запроса. */
        buildPositions(): ApiPosition[] {
            return this.Positions.map((position) => toApi(position));
        }
    };
}