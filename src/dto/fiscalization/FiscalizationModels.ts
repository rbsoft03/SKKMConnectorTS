import { Cashier } from "../Cashier.js";
import { CheckbaseParameters } from "../../data/contracts/CheckbaseParameters.js";

/** Параметры фискализации ККТ. */
export class FiscalizationParameters {
    DeviceName: string = "";
    Cashier?: Cashier;
    RnNumber: string = "";
    TaxationSystems: string = "";
    Vatin: string = "";
    CompanyName: string = "";
    Fn: string = "";
    FfdVersionKkt: string = "";
    FfdVersionFn: string = "";
    RegistrationLabelCodes: string = "";
    OfdAddress: string = "";
    OfdPort: number = 0;
    AutomaticNumber: string = "";
    SenderEmail: string = "";
    ReasonCode: number = 0;
    IsmHost: string = "";
    IsmPort: number = 0;
    FnsUrl: string = "";
    OfdVatin: string = "";
    OfdName: string = "";
    AgentTypes: string = "";
    IsBsoSign: boolean = false;
    IsMarking: boolean = false;
    IsPawnshop: boolean = false;
    IsAssurance: boolean = false;
    IsAutomatic: boolean = false;
    IsVending: boolean = false;
    IsAutomaticPrinter: boolean = false;
    IsOnline: boolean = false;
    IsLottery: boolean = false;
    IsGambling: boolean = false;
    IsExcisable: boolean = false;
    IsService: boolean = false;
    IsEncrypted: boolean = false;
    IsOffline: boolean = false;
    IsCateringServices: boolean = false;
    IsWholesaleTrade: boolean = false;
    SaleAddress: string = "";
    SaleLocation: string = "";
}

/** Результат фискализации. */
export class FiscalizationDocument {
    OperationType: number = 0;
    RnNumber: string = "";
    TaxationSystems: string = "";
    Vatin: string = "";
    CompanyName: string = "";
    FfdVersionKkt: string = "";
    FfdVersionFn: string = "";
    IsFiscal: boolean = false;
    DocId: string = "";
    DeviceName: string = "";
    ShiftNumber: number = 0;
    DocNumber: number = 0;
    FiscalSign: string = "";
}

/** Тело запроса фискализации.*/
export class FiscalizationRequest extends CheckbaseParameters {
    RnNumber?: string;
    TaxationSystems?: string;
    Vatin?: string;
    CompanyName?: string;
    Fn?: string;
    FfdVersionKkt?: string;
    FfdVersionFn?: string;
    RegistrationLabelCodes?: string;
    OfdAddress?: string;
    OfdPort?: number;
    AutomaticNumber?: string;
    SenderEmail?: string;
    ReasonCode?: number;
    IsmHost?: string;
    IsmPort?: number;
    FnsUrl?: string;
    OfdVatin?: string;
    OfdName?: string;
    AgentTypes?: string;
    IsBsoSign?: boolean;
    IsMarking?: boolean;
    IsPawnshop?: boolean;
    IsAssurance?: boolean;
    IsAutomatic?: boolean;
    IsVending?: boolean;
    IsAutomaticPrinter?: boolean;
    IsOnline?: boolean;
    IsLottery?: boolean;
    IsGambling?: boolean;
    IsExcisable?: boolean;
    IsService?: boolean;
    IsEncrypted?: boolean;
    IsOffline?: boolean;
    IsCateringServices?: boolean;
    IsWholesaleTrade?: boolean;
    SaleAddress?: string;
    SaleLocation?: string;
}