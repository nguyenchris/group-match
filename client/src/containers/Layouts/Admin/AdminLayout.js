import React, { Component } from 'react';
import AdminNavbar from '../../../components/Navbars/AdminNavBar';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { Route, Switch } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import AdminFooter from '../../../components/Footer/AdminFooter';
import { connect } from 'react-redux';
import Logout from '../../Auth/Logout';
import routes from './adminRoutes';
import { getUser, getCurrentWeather } from '../../../utils/api';
import * as actions from '../../../store/actions/index';
import NotificationAlertPopUp from '../../../components/NotificationAlert/NotificationAlertPopUp';

// Contains array of routes, icones, and which component to render for Sidebar
const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    locationError: state.geo.error,
    latitude: state.geo.latitude,
    longitude: state.geo.longitude
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCurrentLocation: () => dispatch(actions.getCurrentLocation())
  };
};

let ps;

// Component to render AdminNavbar, Sidebar and routes to be passed along
class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpened: document.documentElement.className.indexOf('nav-open') !== -1,
      userName: null,
      weather: null,
      timeZone: null,
      weatherSummary: null,
      error: ''
    };
  }
  componentDidMount() {
    // Get user profile
    getUser(this.props.userId, this.props.token).then(result => {
      this.setState({ userName: result.data.name });
    });
    // Get location for user
    this.props.onGetCurrentLocation();

    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on';
      document.documentElement.classList.remove('perfect-scrollbar-off');
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll('.table-responsive');
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.documentElement.className += ' perfect-scrollbar-off';
      document.documentElement.classList.remove('perfect-scrollbar-on');
    }
  }
  componentDidUpdate(e) {
    const { latitude, longitude, token } = this.props;
    if (e.history.action === 'PUSH') {
      if (navigator.platform.indexOf('Win') > -1) {
        let tables = document.querySelectorAll('.table-responsive');
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }

    if (!e.latitude && !e.longitude && latitude && longitude) {
      getCurrentWeather(latitude, longitude, token)
        .then(result => {
          this.setState({
            timeZone: result.data.timezone,
            weather: result.data.temperature,
            weatherSummary: result.data.summary
          });
        })
        .catch(err => {
          this.getError('Unable to get current weather.');
        });
    }
  }

  getError = message => {
    this.setState({
      error: message
    });
    setTimeout(() => {
      this.setState({
        error: ''
      });
    }, 5000);
  };
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle('nav-open');
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/user') {
        return <Route path={prop.layout + prop.path} exact component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Dashboard';
  };
  render() {
    return (
      <>
        <div className="wrapper">
          <Sidebar
            {...this.props}
            routes={routes}
            bgColor="blue"
            logo={{
              text: this.state.userName,
              innerLink: '/user'
            }}
            toggleSidebar={this.toggleSidebar}
          />

          <div className="main-panel" ref="mainPanel" data="blue">
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
              weather={this.state.weather}
              weatherSummary={this.state.weatherSummary}
              timezone={this.state.timeZone}
            />
            {this.props.locationError ? (
              <NotificationAlertPopUp message={this.props.locationError} />
            ) : null}
            {this.state.error ? <NotificationAlertPopUp message={this.state.error} /> : null}

            <Switch>
              {this.getRoutes(routes)}
              <Route path={`${this.props.match.path}/logout`} exact component={Logout} />{' '}
            </Switch>
            {// we don't want the Footer to be rendered on map page
            this.props.location.pathname.indexOf('maps') !== -1 ? null : <AdminFooter fluid />}
          </div>
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLayout);
