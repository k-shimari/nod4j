import * as React from 'react';
import { ValueList, ValueListItemData } from '../organisms/valueList';

interface Props {
  id: string;
  onEnter?(tokenId: string, target: HTMLElement): void;
  onLeave?(tokenId: string, target: HTMLElement): void;
  highlighted: boolean;
  data?: ValueListItemData[];
}

export const Token: React.FunctionComponent<Props> = (props) => {
  const { id, onEnter, onLeave, highlighted } = props;
  const style: React.CSSProperties = highlighted
    ? {
        background: 'linear-gradient(90deg, #6A1B9A, #8E24AA)',
        color: 'white',
        cursor: 'pointer',
        borderRadius: 3,
        padding: '2px 4px'
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
