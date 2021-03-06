import React from 'react';
import { Input, InputGroupAddon, InputGroupText, InputGroup } from 'reactstrap';
import classnames from 'classnames';

const InputField = props => {
  let invalid = null;
  let valid = null;
  console.log(props.touched)
  // Determine if the input field needs validation as well as if user has clicked away from it with an invalid input value
  if (props.shouldValidate && props.touched && !props.focus) {
    invalid = !props.invalid;
    valid = props.invalid;
  }
  return (
    <InputGroup
      className={classnames(
        {
          'input-group-focus': props.focus
        },
        `${invalid ? 'has-danger' : ''}`,
        `${valid ? 'has-success' : ''}`
      )}
    >
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className={`tim-icons icon-${props.icon}`} />
        </InputGroupText>
      </InputGroupAddon>
      <Input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={e => props.changed(e, props.id)}
        onFocus={e => props.focused(true, props.id)}
        onBlur={e => props.focused(false, props.id)}
      />
    </InputGroup>
  );
};

export default InputField;
