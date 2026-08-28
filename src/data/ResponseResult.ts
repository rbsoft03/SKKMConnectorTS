import { ResponseResultBase } from "./ResponseResultBase.js";

/**Ответ сервера ККМ.*/
export class ResponseResult<T> extends ResponseResultBase {
    
    /** Полезная нагрузка ответа. */
    Result?: T;
}