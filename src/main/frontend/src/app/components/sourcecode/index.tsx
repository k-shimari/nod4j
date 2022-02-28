import { Popper } from '@material-ui/core';
import { SourceCodeToken } from 'app/models/token';
import { VarValueData } from 'app/models/varValueData';
import { TimeStampRangeFilter as TimestampRangeFilter } from 'app/reducers/state';
import classNames from 'classnames';
import * as React from 'react';
import { interval, Subject } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { RangeFilterClickEventHandler, ValueList, ValueListItemData } from '../organisms/valueList';
import { Line } from './line';

/**
 * @param tokens are composed of tokens of the source code.
 * @param varValueData is the values of the variable
 * @param currentFilterValue is the information of the fitering start point and endpoint.
 * @param OnArrowUpwardClick changes the filter end point information
 * @param onArrowDownwardClick changes the filter end point information
 */
interface Props {
  tokens: SourceCodeToken[];
  varValueData: VarValueData;
  currentFilterValue: TimestampRangeFilter;
  onArrowUpwardClick?: RangeFilterClickEventHandler;
  onArrowDownwardClick?: RangeFilterClickEventHandler;
}

/**
 * This function returns the source code tokens grouped by line.
 */
function groupTokensByLine(tokens: SourceCodeToken[]): SourceCodeToken[][] {
  const lineCount = tokens[tokens.length - 1].startLine!;
  const result: SourceCodeToken[][] = Array.from({ length: lineCount }).map(() => []);
  for (const token of tokens) {
    pushToken(result, token);
  }
  return result;
}

/**
 * This function creates the array of the line which contains tokens.
 */
function pushToken(result: SourceCodeToken[][], token: SourceCodeToken) {
  let t = { ...token };
  if (t.image.match(/\n/g) === null) {
    result[t.startLine! - 1].push(t);
  } else {
    let index = 0;
    let tmpt;
    while (t.image.match(/\n/g) != null) {
      tmpt = { ...t };
      tmpt.image = t.image.slice(0, t.image.indexOf('\n'));
      tmpt.startColumn = index > 0 ? 1 : t.startColumn;
      result[token.startLine! - 1 + index++].push(tmpt);
      t.image = t.image.slice(t.image.indexOf('\n') + 1);
    }
    t.startColumn = 1;
    result[t.startLine! - 1 + index].push(t);
  }
}

/**
 * This function returns the source code and their values of the variable.
 */
export function Sourcecode(props: Props) {
  const [data, setData] = React.useState<ValueListItemData[] | undefined>(undefined);
  const [activeTokenId, setActiveTokenId] = React.useState<string | undefined>(undefined);
  const [valueListVisible, setValueListVisible] = React.useState(false);
  const [popperAnchorEl, setPopperAnchorEl] = React.useState<HTMLElement | undefined>(undefined);
  const [valueListAnimationEnabled, setValueListAnimationEnabled] = React.useState(false);
  const [showValueListRequestSubject] = React.useState<Subject<boolean>>(new Subject());

  /**
   * This function set the effect for the valueList.
   * setValueListVisible : make the ValueList visible
   * setPopperAnchorEl: set the poppper location of the valueList
   * setValueListAnimationEnabled: set the animation for changing the opening valueList
   */
  React.useEffect(() => {
    showValueListRequestSubject.pipe(debounce(() => interval(200))).subscribe((value) => {
      if (value === false) {
        setValueListVisible(false);
        setPopperAnchorEl(undefined);
        setValueListAnimationEnabled(false);
      } else {
        setValueListAnimationEnabled(true);
      }
    });
  }, []);

  /**
   * This function set the effect for the valueList.
   * Set the ValueList data of the specified token ID.
   */
  React.useEffect(() => {
    if (valueListVisible && activeTokenId) {
      const valueListData = props.varValueData.find(activeTokenId);
      if (valueListData) {
        setData(valueListData);
      }
    }
  }, [props.varValueData]);

  /**
   * This function is called when the mouse cursor hovers on the variable.
   * If the variable has the value, it means highlighted, show the value of variable.
   * setData: set the data of the variable
   * setActiveTokenId: set the tokenID to show its recorded values
   * setValueListVisible : make the ValueList visible
   * setPopperAnchorEl: set the poppper location of the valueList
   */
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

  /**
   * This function is called when the user finishes hovering cursor on the variable.
   */
  function onTokenLeave(tokenId: string, target: HTMLElement) {
    showValueListRequestSubject.next(false);
  }

  /**
   * This function is called when the user starts hovering cursor on the valueList of the variable.
   */
  function onValueListEnter() {
    showValueListRequestSubject.next(true);
  }

  /**
   * This function is called when the user finishes hovering cursor on the valueList of the variable.
   */
  function onValueListLeave() {
    showValueListRequestSubject.next(false);
  }

  const { tokens, varValueData, onArrowUpwardClick, onArrowDownwardClick } = props;

  /**
   * return the tokenID whose token is hovered on mouse cursor.
   */
  function currentToken(): SourceCodeToken {
    return tokens.find((x) => x.id === activeTokenId)!;
  }

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
            currentFilterValue={props.currentFilterValue}
            items={data}
            onEnter={onValueListEnter}
            onLeave={onValueListLeave}
            onArrowUpwardClick={(item) =>
              onArrowUpwardClick && onArrowUpwardClick(item, currentToken())
            }
            onArrowDownwardClick={(item) =>
              onArrowDownwardClick && onArrowDownwardClick(item, currentToken())
            }
          />
        ) : (
          <span> </span>
        )}
      </Popper>
    </div>
  );
}
