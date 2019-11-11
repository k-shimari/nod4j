import * as React from 'react';

interface Props {
  value: string;
}

export const JsonValue: React.FunctionComponent<Props> = (props) => {
  const { value } = props;
  return (
    <span
    >
      {props.children}
    </span>
  );
};
