import { DeviceSettings } from "../../dto/admin/DeviceSettings.js";
import { ServiceSettings } from "../../dto/admin/ServiceSettings.js";
import { ServiceUser } from "../../dto/admin/ServiceUser.js";
import { ApiPosition } from "./ApiPosition.js";
import { Customer } from "../../dto/Customer.js";
import { Payments } from "../../dto/Payments.js";
import { ElectronicPayment } from "../../dto/ElectronicPayment.js";
import { OperationalAttribute } from "../../dto/OperationalAttribute.js";
import { Industry } from "../../dto/positions/Industry.js";
import { UserAttribute } from "../../dto/UserAttribute.js";
import { CorrectionData } from "../../dto/CorrectionData.js";

export class DeviceSettingsRequest {
    DeviceName?: string;
    Settings?: DeviceSettings;
}

export class ServiceSettingsRequest {
    ServiceSettings?: ServiceSettings;
}

export class UserProfileRequest {
    User?: ServiceUser;
}

export class DeviceFontSettingsRequest {
    DeviceName?: string;
    TemplateSettingH1?: string;
    TemplateSettingH2?: string;
    TemplateSettingH3?: string;
    TemplateSettingH4?: string;
    TemplateSettingH5?: string;
}

export class CheckTemplateRequest {
    Name?: string;
    Document?: CheckTemplateDocumentRequest;
}

export class CheckTemplateDocumentRequest {
    PaymentType: number = 0;
    TaxVariant: number = 0;
    Customer?: Customer;
    SenderEmail?: string;
    SaleAddress?: string;
    SaleLocation?: string;
    Positions?: ApiPosition[];
    Payments?: Payments;
    ElectronicPaymentInfo?: ElectronicPayment[];
    Electronically: boolean = false;
    OperationalAttribute?: OperationalAttribute;
    IndustryAttribute?: Industry;
    UserAttribute?: UserAttribute;
    TimeZone?: number;
    OperationOnline: boolean = false;
    AdditionalAttribute?: string;
    CorrectionData?: CorrectionData;
}

export class CheckCopyFnParameters {
    DeviceName?: string;
    FnNumber?: string;
    FiscalSign?: string;
    DocNumber: number = 0;
}

export class MarkingCodesRequest {
    DeviceName?: string;
    Codes: string[] = [];
}