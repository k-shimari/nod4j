import { storiesOf } from '@storybook/react';
import { Sourcecode } from 'app/components/sourcecode';
import { Line } from 'app/components/sourcecode/line';
import { Token } from 'app/components/sourcecode/token';
import { ILexingResult, Lexer } from 'chevrotain';
import * as React from 'react';
const { parse } = require('java-parser');
const JavaLexer: Lexer = require('java-parser/src/lexer');

const javaText = `public class HelloWorldExample{
  public static void main(String args[]){
    System.out.println("Hello World !");
  }
}
`;

const javaText2 = `public static void main(String args[]) {`;

const lexResult: ILexingResult = JavaLexer.tokenize(javaText);
const cst = parse(javaText);
console.log(cst);
console.log(lexResult);

storiesOf('Source code', module)
  .add('Basic', () => <Sourcecode tokens={lexResult.tokens} />)
  .add('Line', () => <Line line={0} tokens={JavaLexer.tokenize(javaText2).tokens} />)
  .add('Token', () => <Token>public</Token>);
