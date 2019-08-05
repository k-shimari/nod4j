import { storiesOf } from '@storybook/react';
import { Sourcecode } from 'app/components/sourcecode';
import { Token } from 'app/components/sourcecode/token';
import { ILexingResult } from 'chevrotain';
import * as React from 'react';
const { parse } = require('java-parser');
const JavaLexer = require('java-parser/src/lexer');

const javaText = `public class HelloWorldExample{
  public static void main(String args[]){
    System.out.println("Hello World !");
  }
}
`;

const lexResult: ILexingResult = JavaLexer.tokenize(javaText);
const cst = parse(javaText);
console.log(cst);
console.log(lexResult);

storiesOf('Source code', module)
  .add('Basic', () => <Sourcecode tokens={lexResult.tokens} />)
  .add('Token', () => <Token>public</Token>);
