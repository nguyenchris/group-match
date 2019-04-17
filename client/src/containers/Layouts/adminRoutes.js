import Search from '../../containers/Search/Search';
import Maps from '../Maps/Maps';
const routes = [
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   icon: 'tim-icons icon-chart-pie-36',
  //   component: Login,
  //   layout: '/user'
  // },
  {
    path: '/search',
    name: 'Search',
    icon: 'tim-icons icon-chart-pie-36',
    component: Search,
    layout: '/user'
  },
  {
    path: '/maps',
    name: 'Dashboard',
    icon: 'tim-icons icon-chart-pie-36',
    component: Maps,
    layout: '/user'
  }
];

export default routes;
