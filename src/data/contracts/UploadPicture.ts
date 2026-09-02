import { PictureAlignment } from "../../dto/enums/PictureAlignment.js";

/**Тело запроса загрузки картинки.*/
export class UploadPicture {
    
    /** Имя кассы. */
    DeviceName?: string;

    /** Изображение в формате Base64 (BMP). */
    Base64?: string;

    /** Имя картинки на сервере. */
    PictureName?: string;

    /** Выравнивание: 1 - слева, 2 - по центру, 3 - справа. */
    Alignment: PictureAlignment = PictureAlignment.Center;
}