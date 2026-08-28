/** Лицензия ККТ. */
export class KktLicense {

    /** Номер лицензии. */
    Number: number = 0;

    /** Наименование лицензии. */
    Name?: string;

    /** Действует с. */
    ValidFrom: string = new Date().toISOString();

    /** Действует до. */
    ValidUntil: string = new Date().toISOString();

    /** Версия узла. */
    UnitVersion?: string;

    /** Описание лицензии. */
    Description?: string;
    
    /** Признак активной лицензии. */
    IsActive: boolean = false;
}