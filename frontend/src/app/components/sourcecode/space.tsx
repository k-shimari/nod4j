import * as React from 'react';

interface Props {
  length: number;
}

export const Space: React.FunctionComponent<Props> = (props) => (
  <span>{' '.repeat(props.length)}</span>
);
