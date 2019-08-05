import { ILexingResult } from 'chevrotain';
import { SourceCodeToken } from './token';
const JavaLexer = require('java-parser/src/lexer');

export function tokenize(text: string): SourceCodeToken[] {
  const lexResult: ILexingResult = JavaLexer.tokenize(text);
  return lexResult.tokens.map((x, index) => ({
    id: (index + 1).toString(),
    ...x
  }));
}
