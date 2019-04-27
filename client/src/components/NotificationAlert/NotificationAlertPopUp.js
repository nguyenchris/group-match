import React, { Component } from 'react';
import NotificationAlert from 'react-notification-alert';

class NotificationAlertPopUp extends Component {
  componentDidMount() {
    this.myFunc();
  }
  myFunc() {
    let options = {};
    options = {
      place: 'tc',
      message: (
        <div>
          <div>{this.props.message}</div>
        </div>
      ),
      type: 'primary',
      icon: 'now-ui-icons ui-1_bell-53',
      autoDismiss: 4
    };
    this.refs.notify.notificationAlert(options);
  }
  render() {
    return (
      <div>
        <NotificationAlert ref="notify" />
      </div>
    );
  }
}

export default NotificationAlertPopUp;
