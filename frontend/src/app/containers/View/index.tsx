import { LogvisActions } from 'app/actions';
import { ValueListItemData } from 'app/components/organisms/valueList';
import { Sourcecode } from 'app/components/sourcecode';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

interface Props {
  actions: LogvisActions;
  logvisState: RootState.LogvisState;
}

@connect(
  (state: RootState) => ({
    logvisState: state.logvis
  }),
  (dispatch: Dispatch) => ({
    actions: bindActionCreators(omit(LogvisActions, 'Type'), dispatch)
  })
)
export class ViewContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.actions.requestSourceCodeData({});
  }

  onArrowUpClick(item: ValueListItemData) {
    this.props.actions.requestValueListFilterChange({ kind: 'right', timestamp: item.timestamp });
  }

  onArrowDownClick(item: ValueListItemData) {
    this.props.actions.requestValueListFilterChange({ kind: 'left', timestamp: item.timestamp });
  }

  render() {
    const tokens = this.props.logvisState.sourceCodeTokens;
    const { filteredValueListData } = this.props.logvisState;
    return tokens ? (
      <div>
        <Sourcecode
          tokens={tokens}
          data={filteredValueListData}
          onArrowUpwardClick={this.onArrowUpClick.bind(this)}
          onArrowDownwardClick={this.onArrowDownClick.bind(this)}
        />
      </div>
    ) : null;
  }
}
