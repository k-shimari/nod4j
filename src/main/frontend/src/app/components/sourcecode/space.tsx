import * as React from 'react';

interface Props {
  length: number;
}
/*
 * set the space between tokens
 */
export const Space: React.FunctionComponent<Props> = (props) => (
  <span>{' '.repeat(props.length)}</span>
);
