import { ILexingResult, IToken } from 'chevrotain';
import { SourceCodeToken } from './token';
const JavaLexer = require('java-parser/src/lexer');
const Comment = require('java-parser/src/comments');

export function tokenize(text: string): SourceCodeToken[] {
  let lexResult: ILexingResult = JavaLexer.tokenize(text);
  let tokens: IToken[] = lexResult.tokens.concat(lexResult.groups.comments)
  console.log(tokens)
  return tokens.map((x, index) => ({
    id: (index + 1).toString(),
    ...x
  }));
}


