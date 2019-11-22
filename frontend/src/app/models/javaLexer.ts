import { ILexingResult } from 'chevrotain';
import { SourceCodeToken } from './token';
const JavaLexer = require('java-parser/src/lexer');
const Comment = require('java-parser/src/comments');

export function tokenize(text: string): SourceCodeToken[] {
  const lexResult: ILexingResult = JavaLexer.tokenize(text);
  Comment.attachComments(lexResult.tokens, lexResult.groups.comments);
  return lexResult.tokens.map((x, index) => ({
    id: (index + 1).toString(),
    ...x
  }));
}
