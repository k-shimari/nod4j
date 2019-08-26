import { LogvisActions } from 'app/actions';
import { ValueListItemData } from 'app/components/organisms/valueList';
import { Sourcecode } from 'app/components/sourcecode';
import { RootState } from 'app/reducers';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function ViewContainer() {
  const logvisState = useSelector<RootState, RootState.LogvisState>((state) => state.logvis);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(LogvisActions.requestSourceCodeData({}));
  }, []);

  const tokens = logvisState.sourceCodeTokens;
  const { filteredValueListData } = logvisState;
  function onArrowUpClick(item: ValueListItemData) {
    dispatch(
      LogvisActions.requestValueListFilterChange({ kind: 'right', timestamp: item.timestamp })
    );
  }

  function onArrowDownClick(item: ValueListItemData) {
    dispatch(
      LogvisActions.requestValueListFilterChange({ kind: 'left', timestamp: item.timestamp })
    );
  }

  return tokens ? (
    <div>
      <Sourcecode
        tokens={tokens}
        data={filteredValueListData}
        onArrowUpwardClick={onArrowUpClick}
        onArrowDownwardClick={onArrowDownClick}
      />
    </div>
  ) : null;
}
