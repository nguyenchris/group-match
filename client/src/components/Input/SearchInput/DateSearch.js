import React, { Component } from 'react';
// import { Row, Col, Card, CardHeader, CardBody, FormGroup, CardTitle } from 'reactstrap';
import Datetime from 'react-datetime';
class DateSearch extends Component {
  state = {
    disabledDates: Datetime.moment().subtract(1, 'day')
  };

  render() {
    // Disabled days before today's date
    let valid;
    if (this.props.name === 'range_start') {
      valid = current => current.isAfter(this.state.disabledDates);
    }
    // Disabled dates depending on range_start value
    if (this.props.name === 'range_end') {
      let disabledDates = Datetime.moment(this.props.dateStartValue).add(1, 'day');
      valid = current => current.isAfter(disabledDates);
    }
    return (
      <div name={this.props.name} id={this.props.name}>
        <Datetime
          timeFormat={false}
          isValidDate={valid}
          inputProps={this.props.inputProps}
          onChange={e => this.props.changed(e, this.props.name)}
          utc={true}
          closeOnSelect={true}
        />
      </div>
    );
  }
}

export default DateSearch;
