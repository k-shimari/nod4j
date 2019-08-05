import * as React from 'react';
import { ValueList } from '../organisms/valueList';

interface Props extends ValueList.Props {}

export const HighlightedToken: React.FunctionComponent<Props> = (props) => {
  const { items, onArrowDownwardClick, onArrowUpwardClick } = props;

  return (
    <div style={{ display: 'inline' }}>
      <span
        style={{
          backgroundColor: 'blue',
          color: 'white'
        }}
      >
        {props.children}
      </span>
      <ValueList
        style={{
          position: 'absolute',
          width: '100%'
        }}
        items={items}
      />
    </div>
  );
};
