import Search from '../../../containers/Search/Search';
import Maps from '../../Maps/Maps';
import Feed from '../../Feed/Feed';
const routes = [
  {
    path: '/feed',
    name: 'News Feed',
    icon: 'tim-icons icon-chart-pie-36',
    component: Feed,
    layout: '/user'
  },
  {
    path: '/search',
    name: 'Event Search',
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