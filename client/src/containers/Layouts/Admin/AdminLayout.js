import React, { Component } from 'react';
import AdminNavbar from '../../../components/Navbars/AdminNavBar';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { Route, Switch } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import AdminFooter from '../../../components/Footer/AdminFooter';
import { connect } from 'react-redux';
import Logout from '../../Auth/Logout';
import routes from './adminRoutes';
import { getCurrentWeather } from '../../../utils/api';
import * as actions from '../../../store/actions/index';
import NotificationAlertPopUp from '../../../components/NotificationAlert/NotificationAlertPopUp';
import Profile from '../../Profile/Profile';
// import ProfileForm from '../../../components/Form/Profile/ProfileForm';
import ModalProfile from '../../../components/Modal/ModalProfile';

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    userState: state.auth,
    locationError: state.geo.error,
    latitude: state.geo.latitude,
    longitude: state.geo.longitude
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateProfile: (token, data) => dispatch(actions.createProfile(token, data, 'update')),
    onGetCurrentLocation: () => dispatch(actions.getCurrentLocation())
  };
};

let ps;

// Component to render AdminNavbar, Sidebar and routes to be passed along
class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColor: 'blue',
      sidebarOpened: false,
      sidebarMini: true,
      opacity: 0,
      userName: null,
      weather: null,
      timeZone: null,
      weatherSummary: null,
      getWeather: true,
      user: null,
      error: ''
    };
  }
  componentDidMount() {
    // getUser(this.props.userId, this.props.token)
    //   .then(result => {
    //     this.setState({ ...this.state, userName: result.data.name, user: result.data });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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
    window.addEventListener('scroll', this.showNavbarButton);
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.documentElement.className += ' perfect-scrollbar-off';
      document.documentElement.classList.remove('perfect-scrollbar-on');
    }
    window.removeEventListener('scroll', this.showNavbarButton);
  }
  componentDidUpdate(e) {
    const { latitude, longitude, token, isProfileCreated } = this.props;
    if (e.location.pathname !== e.history.location.pathname) {
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

    if (this.state.getWeather && latitude && longitude) {
      console.log('getting weather');
      getCurrentWeather(latitude, longitude, token)
        .then(result => {
          this.setState({
            timeZone: result.data.timezone,
            weather: result.data.temperature,
            weatherSummary: result.data.summary,
            getWeather: false
          });
        })
        .catch(err => {
          this.getError('Unable to get current weather.');
        });
    }

    // if (!e.latitude && !e.longitude && latitude && longitude) {
    //   getCurrentWeather(latitude, longitude, token)
    //     .then(result => {
    //       this.setState({
    //         timeZone: result.data.timezone,
    //         weather: result.data.temperature,
    //         weatherSummary: result.data.summary
    //       });
    //     })
    //     .catch(err => {
    //       this.getError('Unable to get current weather.');
    //     });
    // }
  }

  showNavbarButton = () => {
    if (
      document.documentElement.scrollTop > 50 ||
      document.scrollingElement.scrollTop > 50 ||
      this.refs.mainPanel.scrollTop > 50
    ) {
      this.setState({ opacity: 1 });
    } else if (
      document.documentElement.scrollTop <= 50 ||
      document.scrollingElement.scrollTop <= 50 ||
      this.refs.mainPanel.scrollTop <= 50
    ) {
      this.setState({ opacity: 0 });
    }
  };

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

  closeSidebar = () => {
    this.setState({
      sidebarOpened: false
    });
    document.documentElement.classList.remove('nav-open');
  };

  handleMiniClick = () => {
    if (document.body.classList.contains('sidebar-mini')) {
      this.setState({ sidebarMini: false });
    } else {
      this.setState({ sidebarMini: true });
    }
    document.body.classList.toggle('sidebar-mini');
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
          <div className="navbar-minimize-fixed" style={{ opacity: this.state.opacity }}>
            <button
              className="minimize-sidebar btn btn-link btn-just-icon"
              onClick={this.handleMiniClick}
            >
              <i className="tim-icons icon-align-center visible-on-sidebar-regular text-muted" />
              <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini text-muted" />
            </button>
          </div>
          <Sidebar
            {...this.props}
            activeColor={this.state.activeColor}
            routes={routes}
            bgColor="blue"
            logo={{
              text: this.props.userState.name,
              innerLink: '/user/feed'
            }}
            closeSidebar={this.closeSidebar}
          />

          <div className="main-panel" ref="mainPanel" data="blue">
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
              handleMiniClick={this.handleMiniClick}
              weather={this.state.weather}
              weatherSummary={this.state.weatherSummary}
              timezone={this.state.timeZone}
            />
            {this.props.locationError ? (
              <NotificationAlertPopUp message={this.props.locationError} />
            ) : null}
            {this.state.error ? <NotificationAlertPopUp message={this.state.error} /> : null}

            {!this.props.isProfileCreated ? <ModalProfile {...this.props} /> : null}
            {this.props.userState.error ? (
              <NotificationAlertPopUp message={this.props.userState.error} />
            ) : null}
            <Switch>
              {this.getRoutes(routes)}
              <Route path={`${this.props.match.path}/profile/:id`} component={Profile} />
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
