import * as React from 'react';
import { IToken } from 'chevrotain';

interface Props {
  comments: IToken[] | undefined;
  id: string;
}

function spreadComments(props: Props): React.ReactElement[] {
  const { comments } = props;
  if (comments === undefined || comments.length === 0) {
    return [<span key={props.comments + "s"}> </span>];
  }

  const result: React.ReactElement[] = [];
  let index = 0;
  for (const comment of comments) {
    result.push(
      <span key={props.id + "lc" + index++}>{comment.image}</span>
    );
  }
  return result;
}

export const Comment: React.FunctionComponent<Props> = (props) => (
  <span>
    {spreadComments(props)}
  </span>
);
