import { ILexingResult, IToken } from 'chevrotain';
import { SourceCodeToken } from './token';
const JavaLexer = require('java-parser/src/lexer');
const Comment = require('java-parser/src/comments');

export function tokenize(text: string): SourceCodeToken[] {
  let lexResult: ILexingResult = JavaLexer.tokenize(text);
  let tokens: IToken[] = lexResult.tokens.concat(lexResult.groups.comments)
  tokens.orderBy('startOffset');
  return tokens.map((x, index) => ({
    id: (index + 1).toString(),
    ...x
  }));
}

declare global {
  interface Array<T> {
    orderBy<K extends keyof T>(...sortKeys: K[]): T[];
  }
}

Array.prototype.orderBy = function <T, K extends keyof T>(...sortKeys: K[]): T[] {
  const items = this as T[];
  return items.sort((a: T, b: T) => compare(a, b, sortKeys));
};

function compare<T, K extends keyof T>(value1: T, value2: T, sortKeys: K[]): number {
  const key = sortKeys[0];
  return (value1[key] < value2[key]) ? -1 : 1;
}
