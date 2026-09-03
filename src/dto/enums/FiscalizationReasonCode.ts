/**Код причины перерегистрации ККТ */
export enum FiscalizationReasonCode{
    
    /**Замена ФН. */
    FnReplacement = 1,

    /**Замена ОФД. */
    OfdReplacement = 2,

    /**Изменение реквизитов. */
    RequisitesChange = 3,

    /**Изменение настроек ККТ. */
    SettingsChange = 4
}