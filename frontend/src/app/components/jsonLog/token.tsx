import * as React from 'react';

interface Props {
  id: string;
}

export const Token: React.FunctionComponent<Props> = (props) => {
  const { id } = props;
  return (
    <span
    >
      {props.children}
    </span>
  );
};
