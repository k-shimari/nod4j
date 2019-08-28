import { Popper } from '@material-ui/core';
import { SourceCodeToken } from 'app/models/token';
import { VarValueData } from 'app/models/varValueData';
import * as React from 'react';
import { interval, Subject } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { RangeFilterClickEventHandler, ValueList, ValueListItemData } from '../organisms/valueList';
import { Line } from './line';
import classNames = require('classnames');

interface Props {
  tokens: SourceCodeToken[];
  varValueData: VarValueData;
  onArrowUpwardClick?: RangeFilterClickEventHandler;
  onArrowDownwardClick?: RangeFilterClickEventHandler;
}

function groupTokensByLine(tokens: SourceCodeToken[]): SourceCodeToken[][] {
  const lineCount = tokens[tokens.length - 1].startLine!;
  const result: SourceCodeToken[][] = Array.from({ length: lineCount }, (v, k) => k).map(() => []);

  for (const token of tokens) {
    result[token.startLine! - 1].push(token);
  }

  return result;
}

export function Sourcecode(props: Props) {
  const [data, setData] = React.useState<ValueListItemData[] | undefined>(undefined);
  const [activeTokenId, setActiveTokenId] = React.useState<string | undefined>(undefined);
  const [valueListVisible, setValueListVisible] = React.useState(false);
  const [popperAnchorEl, setPopperAnchorEl] = React.useState<HTMLElement | undefined>(undefined);
  const [valueListAnimationEnabled, setValueListAnimationEnabled] = React.useState(false);
  const [showValueListRequestSubject] = React.useState<Subject<boolean>>(new Subject());

  React.useEffect(() => {
    showValueListRequestSubject.pipe(debounce(() => interval(200))).subscribe((value) => {
      if (value === false) {
        setValueListVisible(false);
        setPopperAnchorEl(undefined);
        setValueListAnimationEnabled(false);
      }
      if (value === true) {
        setValueListAnimationEnabled(true);
      }
    });
  }, []);

  React.useEffect(() => {
    if (valueListVisible && activeTokenId) {
      const valueListData = props.varValueData.find(activeTokenId);
      if (valueListData) {
        setData(valueListData);
      }
    }
  }, [props.varValueData]);

  function onTokenEnter(tokenId: string, target: HTMLElement) {
    const valueListData = props.varValueData.find(tokenId);
    if (valueListData) {
      showValueListRequestSubject.next(true);

      setData(valueListData);
      setActiveTokenId(tokenId);
      setValueListVisible(true);
      setPopperAnchorEl(target);
    }
  }

  function onTokenLeave(tokenId: string, target: HTMLElement) {
    showValueListRequestSubject.next(false);
  }

  function onValueListEnter() {
    showValueListRequestSubject.next(true);
  }

  function onValueListLeave() {
    showValueListRequestSubject.next(false);
  }

  const { tokens, varValueData, onArrowUpwardClick, onArrowDownwardClick } = props;

  return (
    <div>
      <pre>
        <code>
          {groupTokensByLine(tokens).map((lineTokens, index) => (
            <Line
              key={index}
              tokens={lineTokens}
              line={index + 1}
              data={varValueData}
              onTokenEnter={onTokenEnter}
              onTokenLeave={onTokenLeave}
            />
          ))}
        </code>
      </pre>
      <Popper
        className={classNames(['popper-wrapper'], {
          'popper-wrapper-transform-animation': valueListAnimationEnabled,
          open: data !== undefined
        })}
        open={valueListVisible}
        anchorEl={popperAnchorEl}
        placement="bottom"
      >
        {data ? (
          <ValueList
            items={data}
            onEnter={onValueListEnter}
            onLeave={onValueListLeave}
            onArrowUpwardClick={onArrowUpwardClick}
            onArrowDownwardClick={onArrowDownwardClick}
          />
        ) : (
          <span> </span>
        )}
      </Popper>
    </div>
  );
}
