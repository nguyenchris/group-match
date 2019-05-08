import React, { Component } from 'react';
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  ButtonGroup,
  Badge,
  UncontrolledTooltip,
  Collapse
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SinglePost extends Component {
  state = {
    openedCollapses: []
  };
  collapsesToggle = (e, collapse) => {
    e.preventDefault();
    let openedCollapses = [...this.state.openedCollapses];
    if (openedCollapses.includes(collapse)) {
      this.setState({
        openedCollapses: openedCollapses.filter(item => item !== collapse)
      });
    } else {
      openedCollapses.push(collapse);
      this.setState({
        openedCollapses: openedCollapses
      });
    }
  };
  render() {
    let isOnline = false;
    if (this.props.usersOnline) {
      isOnline = this.props.usersOnline.some(user => user._id === this.props.post.creator._id);
    }
    return (
      <Col md="4">
        <Card className="card-testimonial post-card">
          <CardHeader className="card-header-avatar">
            <Link
              to={{
                pathname: `/user/profile/${this.props.post.creator._id}`
              }}
            >
              <img
                alt={this.props.post.creator.name}
                className="img img-raised"
                id={this.props.tooltipId}
                src={this.props.post.creator.imageUrl}
              />
            </Link>
          </CardHeader>
          <CardBody>
            <CardTitle tag="h3">{this.props.post.content}</CardTitle>
          </CardBody>
          <CardFooter className="post-footer">
            <hr />
            <Link
              to={{
                pathname: `/user/profile/${this.props.post.creator._id}`
              }}
            >
              <h6 id={this.props.tooltipId2}>{this.props.post.creator.name}</h6>
            </Link>
            <h6>
              {isOnline ? (
                <span className="text-success">Online</span>
              ) : (
                <span className="text-danger">Offline</span>
              )}
            </h6>
            <h6 className="text-muted post-time">
              {/* <i className="ti-time" /> */}
              Posted {this.props.time}
            </h6>
            {/* <ButtonGroup> */}
            <Button color="info" className="btn-link" type="button">
              <i className="tim-icons icon-heart-2" /> {'  '}Like{' '}
              <Badge className="badge-like btn-round" color="info">
                4
              </Badge>
            </Button>
            <Button color="info" className="btn-link" type="button">
              Comment
            </Button>
            {/* </ButtonGroup> */}
            <div
              aria-multiselectable={false}
              className="card-collapse"
              id="accordion"
              role="tablist"
            >
              <Card className="card-plain">
                <CardHeader role="tab">
                  <a
                    aria-expanded={this.state.openedCollapses.includes('collapseOne')}
                    href="#pablo"
                    data-parent="#accordion"
                    data-toggle="collapse"
                    onClick={e => this.collapsesToggle(e, 'collapseOne')}
                  >
                    View Comments <i className="tim-icons icon-minimal-down text-info" />
                  </a>
                </CardHeader>
                <Collapse
                  role="tabpanel"
                  isOpen={this.state.openedCollapses.includes('collapseOne')}
                >
                  <CardBody>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                    richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
                    brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                    shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                    cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt
                    you probably haven't heard of them accusamus labore sustainable VHS.
                  </CardBody>
                </Collapse>
              </Card>
            </div>
          </CardFooter>
          <UncontrolledTooltip delay={0} placement="bottom" target={this.props.tooltipId}>
            View Profile
          </UncontrolledTooltip>
          <UncontrolledTooltip delay={0} placement="top" target={`${this.props.tooltipId2}`}>
            View Profile
          </UncontrolledTooltip>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersOnline: state.feed.usersOnline
  };
};

export default connect(
  mapStateToProps,
  null
)(SinglePost);
