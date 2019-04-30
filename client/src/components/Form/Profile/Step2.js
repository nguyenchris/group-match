import React, { Fragment } from 'react';
import { Input, FormGroup, Row, Col, Button } from 'reactstrap';

class SecondStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      urlState: '',
      previewUrl:
        'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png',
      previewClicked: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if user changed a valid url after clicking preview
    if (prevState.url !== '' && this.state.url === '') {
      this.setState({
        previewClicked: false
      });
    }
  }

  verifyUrl = value => {
    try {
      new URL(value);
      console.log(new URL(value));
      return true;
    } catch (_) {
      return false;
    }
  };

  handleInput = (e, stateName, type) => {
    if (this.verifyUrl(e.target.value)) {
      this.setState({ [stateName + 'State']: 'has-success', [type]: e.target.value });
    } else {
      this.setState({ [stateName + 'State']: 'has-danger', [type]: '' });
    }
  };

  isValidated() {
    if (
      this.state.urlState !== 'has-danger' &&
      this.state.url !== '' &&
      this.state.previewUrl !==
        'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png' &&
      this.state.previewClicked
    ) {
      return true;
    } else {
      this.setState({
        urlState: 'has-danger'
      });
      return false;
    }
  }

  handlePreviewClick = (e, url) => {
    e.preventDefault();
    if (this.state.urlState !== 'has-danger') {
      this.setState({
        ...this.state,
        previewUrl: this.state.url,
        previewClicked: true
      });
    }
  };

  verifyImage = e => {
    if (e) {
      console.log('updateState error image');
      this.setState({
        urlState: 'has-danger',
        url: '',
        previewClicked: false
      });
    }
  };
  render() {
    return (
      <Fragment>
        <Row>
          <Col>
            <div className="card-user text-center">
              <img
                onError={this.verifyImage}
                src={this.state.previewUrl}
                className="avatar"
                alt="Invalid"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="9">
            <FormGroup className={this.urlState}>
              <Input
                name="url"
                placeholder="Profile Image URL (required)"
                type="text"
                onChange={e => this.handleInput(e, 'url', 'url')}
              />
              {this.state.urlState === 'has-danger' ? (
                <label className="error text-danger">
                  Please enter a valid Image URL and select preview.
                </label>
              ) : null}
            </FormGroup>
          </Col>
          <Col sm="2">
            <Button className="btn-simple" color="twitter" onClick={this.handlePreviewClick}>
              Preview
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default SecondStep;
