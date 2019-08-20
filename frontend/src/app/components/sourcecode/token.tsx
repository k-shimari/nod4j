import * as React from 'react';
import { ValueList, ValueListItem } from '../organisms/valueList';

interface Props {
  id: string;
  onEnter?(tokenId: string, target: HTMLElement): void;
  onLeave?(tokenId: string, target: HTMLElement): void;
  highlighted: boolean;
  data?: ValueListItem[];
}

export const Token: React.FunctionComponent<Props> = (props) => {
  const { id, onEnter, onLeave, highlighted } = props;
  const style: React.CSSProperties = highlighted
    ? {
        backgroundColor: 'blue',
        color: 'white',
        cursor: 'pointer'
      }
    : {};
  return (
    <span
      style={style}
      onPointerEnter={(event) => onEnter && onEnter(id, event.currentTarget)}
      onPointerLeave={(event) => onLeave && onLeave(id, event.currentTarget)}
    >
      {props.children}
    </span>
  );
};
