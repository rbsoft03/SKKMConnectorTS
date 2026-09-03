/** Строка журнала кодов маркировки операции. */
export class OperationKmRow {
    /**Код маркировки (КиЗ).  */
    Cis: string = "";
    /**Время проверки кода.  */
    CheckedAt: string = "";
    /**Код маркировки без крипто-подписи.  */
    PrintView: string = "";
    /**Сообщение о результате проверки.  */
    Message: string = "";
    /**Статус проверки кода.  */
    CheckStatus: number = 0;
    /**Наименование позиции чека.  */
    PositionName: string = "";
    /**Идентификаторы связанных документов.  */
    DocIds: string[] = [];
    /**Цена продажи (в копейках).  */
    SalePrice: number = 0;
    /**Имя устройства.  */
    DeviceName: string = "";
    /**Идентификатор марки.  */
    MarkId: string = "";
    /**Метод проверки кода маркировки.  */
    KmVerificationMethod: number = 0;
    /**Инициатор проверки кода маркировки.  */
    KmCheckInitiator: number = 0;
}