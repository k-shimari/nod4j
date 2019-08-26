import { LogvisActions } from 'app/actions';
import { ValueListItemId } from 'app/components/atoms/valueListItem';
import { ValueListItem } from 'app/components/organisms/valueList';
import { Sourcecode, VarValueData } from 'app/components/sourcecode';
import * as JavaLexer from 'app/models/javaLexer';
import { rawSourceCode } from 'app/models/rawSourceCode';
import { SourceCodeToken } from 'app/models/token';
import { jsonData, JsonData, VarInfo } from 'app/models/variable';
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
    this.props.actions.requestValueListFilterChange({ kind: 'top', execId: '123' });
  }

  onArrowUpClick(id: ValueListItemId) {
    this.props.actions.requestValueListFilterChange({ kind: 'bottom', execId: '123' });
  }

  onArrowDownClick(id: ValueListItemId) {
    this.props.actions.requestValueListFilterChange({ kind: 'top', execId: '123' });
  }

  render() {
    const tokens = JavaLexer.tokenize(rawSourceCode);
    const { filteredValueListData } = this.props.logvisState;
    return (
      <div>
        <Sourcecode
          tokens={tokens}
          data={filteredValueListData}
          onArrowUpwardClick={this.onArrowUpClick.bind(this)}
          onArrowDownwardClick={this.onArrowDownClick.bind(this)}
        />
      </div>
    );
  }
}
