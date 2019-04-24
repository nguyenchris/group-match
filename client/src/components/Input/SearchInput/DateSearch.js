import React, { Component } from 'react';
// import { Row, Col, Card, CardHeader, CardBody, FormGroup, CardTitle } from 'reactstrap';
import Datetime from 'react-datetime';
class DateSearch extends Component {
  render() {
    // Disable past dates
    const yesterday = Datetime.moment().subtract(1, 'day');
    const valid = current => current.isAfter(yesterday);

    return (
      <div name={this.props.name}>
        <Datetime
          timeFormat={false}
          isValidDate={valid}
          inputProps={this.props.inputProps}
          onChange={e => this.props.changed(e, this.props.name)}
          utc={true}
        />
      </div>
    );
  }
}

export default DateSearch;
