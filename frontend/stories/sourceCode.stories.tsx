import { storiesOf } from '@storybook/react';
import { Sourcecode } from 'app/components/sourcecode';
import { Line } from 'app/components/sourcecode/line';
import { Token } from 'app/components/sourcecode/token';
import * as React from 'react';
const { parse } = require('java-parser');
// const JavaLexer: Lexer = require('java-parser/src/lexer');
import * as JavaLexer from 'app/models/javaLexer';

const javaText = `public class HelloWorldExample{
  public static void main(String args[]){
    System.out.println("Hello World !");
  }
}
`;

const javaText2 = `public static void main(String args[]) {`;

const cst = parse(javaText);
console.log(cst);

storiesOf('Source code', module)
  .add('Basic', () => (
    <Sourcecode
      tokens={JavaLexer.tokenize(javaText)}
      data={{
        '1': [123, 456, 789],
        '10': [1, 2, 3]
      }}
    />
  ))
  .add('Line', () => <Line line={0} tokens={JavaLexer.tokenize(javaText2)} data={{}} />)
  .add('Token', () => <Token>public</Token>);
