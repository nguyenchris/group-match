import React, { Component, Fragment } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
// import InputField from '../../components/Input/InputField';

class Search extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <div className="content">
          <Row>
            <Col>
              <Card style={{ width: '20rem' }}>
                <CardImg top src="img-src" alt="..." />
                <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make up the bulk of the
                    card's content.
                  </CardText>
                  <Button color="primary">Go somewhere</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default Search;
