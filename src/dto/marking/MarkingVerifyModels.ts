/** Результат проверки кода маркировки. */
export class MarkingVerifyResult {
    Code: number = 0;
    Description: string = "";
    Codes: CodeMarkInfo[] = [];
    ReqId: string = "";
    ReqTimestamp: number = 0;
    IsCheckedOffline: boolean = false;
}

/** Сведения о коде маркировки. */
export class CodeMarkInfo {
    Cis: string = "";
    Valid: boolean = false;
    PrintView: string = "";
    GroupIds: number[] = [];
    Verified: boolean = false;
    Realizable: boolean = false;
    Utilised: boolean = false;
    Found: boolean = false;
    ErrorCode: number = 0;
    Message: string = "";
    IsTracking: boolean = false;
    Sold: boolean = false;
    Gtin: string = "";
    PackageType: string = "";
    ProducerInn: string = "";
    GrayZone: boolean = false;
    IsBlocked: boolean = false;
    IsGreyGtin: boolean = false;
    Ogvs: string[] = [];
    PackageQuantity: number = 0;
}