import { IToken } from 'chevrotain';

/*
 * Define the interface of the token in the source code, which contains rich information of the token.
 */
export interface SourceCodeToken extends IToken {
  id: string;
}
