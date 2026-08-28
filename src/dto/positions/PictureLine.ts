import { Position } from "./Position.js";

/**Изображение*/
export class PictureLine extends Position{

    /**Изображение в Base64*/
    Value: string = "";

    /**Выравнивание изображения*/
    Alignment: number = 2;

    /**Ширина изображения*/
    Width?: number;
    
    /**Высота изображения*/
    Height?: number;
}