import React, { Component, Fragment } from 'react';
import { Row, Col, Input } from 'reactstrap';
// import InputField from '../../components/Input/InputField';

class Search extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <div className="content">
          <Row>
            <Col>
              <Input />
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default Search;
