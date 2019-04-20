import React from 'react';
import { FormGroup, Label, Input, Col } from 'reactstrap';

const Checkbox = props => {
  return (
    <Col xs={6}>
      <FormGroup check key={props.id}>
        <Label check for={props.id}>
          <Input type="checkbox" id={props.id} onChange={props.changed} checked={props.checked} />{' '}
          {props.name}
          <span className="form-check-sign">
            <span className="check" />
          </span>
        </Label>
      </FormGroup>
    </Col>
  );
};
export default Checkbox;
