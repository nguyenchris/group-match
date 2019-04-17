import React from 'react';
import { UncontrolledAlert } from 'reactstrap';

const NotificationAlert = props => {
  return (
    <UncontrolledAlert className="alert-with-icon" color="danger">
      <span data-notify="icon" className="tim-icons icon-alert-circle-exc" />
      <span>
        <b>{props.alert}</b>
      </span>
    </UncontrolledAlert>
  );
};

export default NotificationAlert;
