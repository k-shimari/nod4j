import { storiesOf } from '@storybook/react';
import { Sourcecode } from 'app/components/sourcecode';
import { Line } from 'app/components/sourcecode/line';
import { Token } from 'app/components/sourcecode/token';
import * as React from 'react';
import { ValueListItemData } from 'app/components/organisms/valueList';
import * as JavaLexer from 'app/models/javaLexer';
import { VarValueData } from 'app/models/varValueData';

const javaText = `public class HelloWorldExample{
  public static void main(String args[]){
    System.out.println("Hello World !");
  }
}
`;

const javaText2 = `public static void main(String args[]) {`;

storiesOf('Source code', module)
  .add('Basic', () => (
    <Sourcecode
      tokens={JavaLexer.tokenize(javaText)}
      currentFilterValue={{}}
      varValueData={
        new VarValueData({
          '1': [
            ValueListItemData.create('1', 123, '1'),
            ValueListItemData.create('2', 456, '2'),
            ValueListItemData.create('3', 789, '3')
          ],
          '10': [
            ValueListItemData.create('1', 789, '1'),
            ValueListItemData.create('2', 456, '2'),
            ValueListItemData.create('3', 123, '3')
          ]
        })
      }
    />
  ))
  .add('Line', () => (
    <Line line={0} tokens={JavaLexer.tokenize(javaText2)} data={new VarValueData({})} />
  ))
  .add('Token', () => (
    <Token id="1" highlighted={false}>
      public
    </Token>
  ));
