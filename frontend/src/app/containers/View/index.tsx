import { jsonData } from 'app/models/variable';
import * as React from 'react';

export class ViewContainer extends React.Component {
  componentDidMount() {
    console.log(jsonData);
  }
  render() {
    return (
      <div>
        {jsonData.data.map((x) => (
          <div>{x.var}</div>
        ))}
      </div>
    );
  }
}
