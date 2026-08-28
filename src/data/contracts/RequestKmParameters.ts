import { RequestKm } from "./RequestKm.js";

/**Тело запроса проверки кода маркировки.*/
export class RequestKmParameters {
    
    /** Имя кассы. */
    DeviceName?: string;

    /** Параметры проверяемого кода маркировки. */
    RequestKM: RequestKm = new RequestKm();
}