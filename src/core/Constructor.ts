/**
 * Вспомогательный тип - эмуляция C# partial class в TS.*/
export type Constructor<T = object> = new (...args: any[]) => T;