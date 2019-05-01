import React, { Component } from 'react';

class FeedItems extends Component {
  render() {
    return (
      <div className="feedItems">
        {this.props.items.map((feedItem, index) => {
          if (feedItem.type === 'comment') {
            return (
              <div className="feedItem" key={index}>
                {' '}
                {feedItem.userName}: "{feedItem.value}"
              </div>
            );
          } else if (feedItem.type === 'attendEvent') {
            return (
              <div className="feedItem" key={index}>
                {' '}
                {feedItem.userName} is attending event "{feedItem.event.eventName}"
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default FeedItems;
