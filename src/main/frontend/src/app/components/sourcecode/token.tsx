import * as React from 'react';
import { ValueListItemData } from '../organisms/valueList';

/**
 * @param id is the token id in the source code.
 * @param onEnter is called when hovering mouse cursor on the point.
 * @param onLeave is called when leaving mouse cursor on the point.
 * @param highlighted means the variable has the value in the current filtering.
 * @param data is the values of the variable by id.
 */
interface Props {
  id: string;
  onEnter?(tokenId: string, target: HTMLElement): void;
  onLeave?(tokenId: string, target: HTMLElement): void;
  highlighted: boolean;
  data?: ValueListItemData[];
}

/**
 * Return the token with setting the style and its values.
 */
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
