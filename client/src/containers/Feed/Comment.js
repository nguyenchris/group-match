import React, { Component } from 'react';
import { CardBody, Card, CardImg, CardTitle, CardText, Button } from 'reactstrap';

class Comment extends Component {

	constructor(props) {
		super(props);
		this.state = {
			comment: ""
		}
		this.handlePost = this.handlePost.bind(this);
	}

	handlePost() {
		console.log("Posted", this.state.comment);
		this.props.onPost(this.state.comment);
	}

	handleCommentChange(e) {
		this.setState({ comment: e.target.value });
	}

	render() {
		return (
			<div className="comment">
				Comment: <input
					value={this.state.comment}
					onChange={(e) => this.handleCommentChange(e)}></input> <button onClick={this.handlePost}>Post</button>
			</div>
		);
	}
}

export default Comment;