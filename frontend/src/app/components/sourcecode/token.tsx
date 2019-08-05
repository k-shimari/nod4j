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

export const HighlightedToken: React.FunctionComponent = (props) => (
  <span
    style={{
      backgroundColor: 'blue',
      color: 'white'
    }}
  >
    {props.children}
  </span>
);
