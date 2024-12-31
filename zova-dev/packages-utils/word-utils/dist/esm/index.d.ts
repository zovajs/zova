export declare function toLowerCaseFirstChar(str: string): string;
export declare function toUpperCaseFirstChar(str: string): string;
export declare function parseLastWord(str?: string, toLowerCase?: boolean): string | undefined;
export declare function parseFirstWord(str?: string, toLowerCase?: boolean): string | undefined;
export declare function skipPrefix(str?: string, prefix?: string, toLowerCase?: boolean): string | undefined;
export declare function skipLastWord(str?: string, lastWord?: string, toLowerCase?: boolean): string | undefined;
export declare function splitWords(str?: string, toLowerCase?: boolean, separator?: string): string | undefined;
export declare function combineWordsDeduplicate(str1: string, str2: string): string;
export declare function stringToCapitalize(str: string[] | string, separator?: string): string;
export declare function replaceTemplate(content: string | undefined, scope?: object | undefined): string | undefined;
export type TypeMatchSelectorRule<T> = T | RegExp | (T | RegExp)[];
export declare function matchSelector<T extends string = string>(match: TypeMatchSelectorRule<T>, selector: string): any;
export declare function hashCode(input: string): number;
//# sourceMappingURL=index.d.ts.map