import { LogvisActions } from 'app/actions';
import { ValueListItemId } from 'app/components/atoms/valueListItem';
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

  onArrowUpClick() {
    // TODO: 固定の値を外す
    this.props.actions.requestValueListFilterChange({ kind: 'right', timestamp: '15000' });
  }

  onArrowDownClick() {
    this.props.actions.requestValueListFilterChange({ kind: 'left', timestamp: '13000' });
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
