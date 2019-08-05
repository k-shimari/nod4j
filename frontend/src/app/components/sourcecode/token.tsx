import * as React from 'react';
import { ValueList } from '../organisms/valueList';

export const Token: React.FunctionComponent = (props) => (
  <span
    style={{
      border: '1px lightgray solid'
    }}
  >
    {props.children}
  </span>
);
