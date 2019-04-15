import React, { Component } from 'react';
import AdminNavbar from '../../components/Navbars/AdminNavBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Route, Switch } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import Login from '../../containers/Auth/Login';
import AdminFooter from '../../components/Footer/AdminFooter';
import Search from '../../containers/Search/Search';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'tim-icons icon-chart-pie-36',
    component: Login,
    layout: '/user'
  },
  {
    path: '/search',
    name: 'Search',
    icon: 'tim-icons icon-chart-pie-36',
    component: Search,
    layout: '/user'
  }
];

const mapStateToProps = state => {
  return {
    userName: state.auth.name
  };
};

const mapDispatchToProps = dispatch => {
  return {  };
};

let ps;

class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'blue',
      sidebarOpened: document.documentElement.className.indexOf('nav-open') !== -1
    };
  }
  componentDidMount() {
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
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle('nav-open');
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/user') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };
  render() {
    return (
      <>
        <div className={`wrapper`}>
          <Sidebar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{
              text: 'User Name'
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div className="main-panel" ref="mainPanel" data={this.state.backgroundColor}>
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />

            <Switch>{this.getRoutes(routes)}</Switch>
            {/* {// we don't want the Footer to be rendered on map page
            this.props.location.pathname.indexOf('maps') !== -1 ? null : <AdminFooter fluid />} */}
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
