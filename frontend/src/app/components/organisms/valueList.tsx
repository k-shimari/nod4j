import List from '@material-ui/core/List';
import { ValueListItem } from 'app/components/atoms/valueListItem';
import * as React from 'react';

function generate(element: any) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value
    })
  );
}

export const ValueList: React.FunctionComponent = (props) => {
  return <List dense={false}>{generate(<ValueListItem />)}</List>;
};
