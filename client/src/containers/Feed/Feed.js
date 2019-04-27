import React, { Component } from 'react';
import Comment from "./Comment";
import FeedItems from "./FeedItems";

class Feed extends Component {


	constructor(props) {
		super(props)
		this.state = {
			feedItems: [
				{ type: "comment", value: "Here's a comment", userName: "Dan" },
				{ type: "attendEvent", event: { eventName: "This cool Event" }, userName: "Dan" },
				{ type: "comment", value: "Some other comment", userName: "Joe" },
				{ type: "attendEvent", event: { eventName: "Event B" }, userName: "Sally" },
				{ type: "attendEvent", event: { eventName: "Event A" }, userName: "Bob" }

			]
		}
	}

	handlePost(comment){
		this.setState((prevState) => {
			return prevState.feedItems.push({ type: "comment", value: comment, userName: "Dan" });
		});
	}


  render() {
    return (
      <div className="content">
			<Comment onPost={(comment) => this.handlePost(comment)}></Comment>
			<FeedItems items={this.state.feedItems}></FeedItems>
	  </div>
    );
  }
}

export default Feed;
