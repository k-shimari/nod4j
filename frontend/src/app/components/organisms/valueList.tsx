import List from '@material-ui/core/List';
import {
  ValueListItem,
  ValueListItemId,
  ValueListItemValue
} from 'app/components/atoms/valueListItem';
import * as React from 'react';

interface Props {
  items: {
    id: ValueListItemId;
    value: ValueListItemValue;
  }[];
  onArrowUpwardClick?(id: ValueListItemId): void;
  onArrowDownwardClick?(id: ValueListItemId): void;
}

export const ValueList: React.FunctionComponent<Props> = (props) => {
  const { items, onArrowDownwardClick, onArrowUpwardClick } = props;

  return (
    <List dense={false}>
      {items.map(({ id, value }) => (
        <ValueListItem
          key={id}
          id={id}
          value={value}
          onArrowUpwardClick={onArrowUpwardClick}
          onArrowDownwardClick={onArrowDownwardClick}
        ></ValueListItem>
      ))}
    </List>
  );
};
