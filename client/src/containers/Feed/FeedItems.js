import React, { Component } from 'react';


class FeedItems extends Component {

	constructor(props) {
		super(props);

	}


	render() {
		return (
			<div className="feedItems">
				{
					this.props.items.map(feedItem => {
						if (feedItem.type == "comment") {
							return <div className="feedItem"> {feedItem.userName} said "{feedItem.value}"</div>
						} else if(feedItem.type == "attendEvent") {
							return <div className= "feedItem"> {feedItem.userName} is attending event "{feedItem.event.eventName}"</div>
						}

						})
					}
			</div>
		);
	}
}

export default FeedItems;