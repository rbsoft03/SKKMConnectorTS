import { Position } from "./Position.js";
import { PictureAlignment } from "../enums/PictureAlignment.js";

/**Изображение*/
export class PictureLine extends Position{

    /**Изображение в Base64*/
    Value: string = "";

    /**Выравнивание изображения*/
    Alignment: PictureAlignment = PictureAlignment.Center;

    /**Ширина изображения*/
    Width?: number;
    
    /**Высота изображения*/
    Height?: number;
}