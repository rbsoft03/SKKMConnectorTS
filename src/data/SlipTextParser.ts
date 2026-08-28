// SlipTextParser.ts (полный файл)
import { DocPosition } from "./contracts/DocPosition.js";
import { TextString } from "./contracts/TextString.js";
import { BarcodeLine } from "../dto/positions/BarcodeLine.js";
import { SeparatorLine } from "../dto/positions/SeparatorLine.js";
import { PrintAlignment } from "../dto/enums/PrintAlignment.js";
import { PrintFont } from "../dto/enums/PrintFont.js";
import { BarcodeType } from "../dto/enums/BarcodeType.js";
import { LineStyle } from "../dto/enums/LineStyle.js";

/**
 * Разбор текста с разметкой в строки нефискального документа.
 * Префиксы: [big], [center], [QR], [line], [line,dotted], [dotted].
 */
export class SlipTextParser {
    static parse(text: string): DocPosition[] {
        const positions: DocPosition[] = [];

        for (const rawLine of text.replace(/\r\n/g, "\n").split("\n")) {
            positions.push(SlipTextParser.parseLine(rawLine));
        }

        return positions;
    }

    /**
     * Одна строка: префиксы в тексте превращаются в SeparatorLine / Barcode / TextString.
     */
    static parseLine(line: string, font?: string, alignment?: string): DocPosition {
        let parsedAlignment = tryParseEnum(PrintAlignment, alignment);
        let parsedFont = tryParseEnum(PrintFont, font);
        let barcodeType: BarcodeType | undefined;
        let lineStyle: LineStyle | undefined;
        let hasLineTag = false;

        const closeIndex = line.indexOf("]");
        if (line.startsWith("[") && closeIndex >= 0) {
            const tags = line
                .slice(1, closeIndex)
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t.length > 0);

            let recognized = false;

            for (const tag of tags) {
                if (tag.toLowerCase() === "line") {
                    hasLineTag = true;
                    recognized = true;
                }
            }

            for (const tag of tags) {
                if (tag.length === 0 || /^\d/.test(tag)) continue;

                const parsedLineStyle = tryLineStyle(tag, hasLineTag);
                const parsedBarcode = tryParseEnum(BarcodeType, tag);
                const parsedAlign = tryParseEnum(PrintAlignment, tag);
                const parsedPrintFont = tryParseEnum(PrintFont, tag);

                if (parsedLineStyle !== undefined) {
                    lineStyle = parsedLineStyle;
                } else if (parsedBarcode !== undefined) {
                    barcodeType = parsedBarcode;
                } else if (parsedAlign !== undefined) {
                    parsedAlignment = parsedAlign;
                } else if (parsedPrintFont !== undefined) {
                    parsedFont = parsedPrintFont;
                } else {
                    continue;
                }

                recognized = true;
            }

            // Префикс в квадратных скобках срезаем только если внутри распознан тег
            // (center, dotted, QR, line…). Обычный текст вида "[Промо]" остаётся как есть.
            if (recognized) {
                line = line.slice(closeIndex + 1);
            }
        }

        if (hasLineTag || (lineStyle !== undefined && line.length === 0)) {
            const separatorLine = new SeparatorLine();
            separatorLine.lineStyle = lineStyle ?? LineStyle.Solid;
            const position = new DocPosition();
            position.SeparatorLine = separatorLine;
            return position;
        }

        if (barcodeType !== undefined) {
            const barcode = new BarcodeLine();
            barcode.Type = BarcodeType[barcodeType] ?? "";
            barcode.Barcode = line.trim();
            if (parsedAlignment !== undefined) {
                barcode.Alignment = PrintAlignment[parsedAlignment].toLowerCase();
            }
            const position = new DocPosition();
            position.Barcode = barcode;
            return position;
        }

        const textString = new TextString();
        textString.Text = line;
        if (parsedFont !== undefined) {
            textString.Font = PrintFont[parsedFont];
        }
        if (parsedAlignment !== undefined) {
            textString.Alignment = PrintAlignment[parsedAlignment].toLowerCase();
        }
        const position = new DocPosition();
        position.TextString = textString;
        return position;
    }
}

/**
 * [dotted] / [dashed] / [solid] / [double] - линия.
 * [bold] - шрифт, линия только вместе с [line].
 */
function tryLineStyle(tag: string, hasLineTag: boolean): LineStyle | undefined {
    const style = tryParseEnum(LineStyle, tag);
    if (style === undefined) return undefined;
    if (style === LineStyle.Bold && !hasLineTag) return undefined;
    return style;
}

/**
 * Ищет member enum'а по имени без учёта регистра и возвращает его числовое значение.
 * Игнорирует "обратные" числовые ключи, которые TS сам добавляет в numeric enum.
 */
function tryParseEnum<T extends Record<string, string | number>>(
    enumObj: T,
    value: string | undefined
): T[keyof T] | undefined {
    if (!value || value.trim().length === 0) return undefined;

    const key = Object.keys(enumObj).find(
        (k) => Number.isNaN(Number(k)) && k.toLowerCase() === value.toLowerCase()
    );

    return key !== undefined ? enumObj[key as keyof T] : undefined;
}