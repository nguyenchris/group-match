import Search from '../../../containers/Search/Search';
import Feed from '../../Feed/Feed';
import Profile from '../../Profile/Profile';
import Meetups from '../../Meetups/Meetups';
const routes = [
  {
    path: '/feed',
    name: 'News Feed',
    icon: 'tim-icons icon-sound-wave',
    component: Feed,
    layout: '/user'
  },
  {
    path: '/search',
    name: 'Event Search',
    icon: 'tim-icons icon-zoom-split',
    component: Search,
    layout: '/user'
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: 'tim-icons icon-single-02',
    component: Profile,
    layout: '/user'
  },
  {
    path: '/meetups',
    name: 'Meetups',
    icon: 'fas fa-users',
    component: Meetups,
    layout: '/user'
  }
];

// {
//   path: '/test',
//   name: 'test',
//   icon: 'tim-icons icon-chart-pie-36',
//   component: DevContainerEvents,
//   layout: '/user'
// }
// {
//   path: '/maps',
//   name: 'Dashboard',
//   icon: 'tim-icons icon-chart-pie-36',
//   component: Maps,
//   layout: '/user'
// },

export default routes;
