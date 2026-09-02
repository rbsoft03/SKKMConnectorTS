/**Тип штрихкода для печати в документе.*/
export enum BarcodeType{
    
    /**QR-код*/
    QR,

    /**EAN-13 */
    EAN13,

    /**EAN-8 */
    EAN8,

    /**Code 39 */
    CODE39,

    /**Code 93 */
    CODE93,

    /**Code 128 */
    CODE128,

    /**UPC-A */
    UPCA,

    /**UPC-E */
    UPCE,

    /**Interleaved 2 of 5 */
    ITF,

    /**Codabar */
    CODABAR,

    /**PDF417 */
    PDF417,

    /**Code 32 */
    CODE32
}