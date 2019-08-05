import * as React from 'react';

export const Token: React.FunctionComponent = (props) => (
  <span
    style={{
      border: '1px lightgray solid'
    }}
  >
    {props.children}
  </span>
);
