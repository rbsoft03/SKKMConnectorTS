import { PictureAlignment } from "../enums/PictureAlignment.js";

/** Элемент списка изображений. */
export class Picture {

   /** Название изображения. */
    PictureName?: string;
    
    /** Выравнивание: 1 — по левому краю; 2 — по центру; 3 — по правому краю. */
    Alignment: PictureAlignment = PictureAlignment.Center;

    /** Изображение в Base64 (строка шаблона печати / печатной формы). */
    PictureBase64?: string;

    /** Ширина изображения при печати, в точках. */
    Width?: number;

    /** Высота изображения при печати, в точках. */
    Height?: number;
}