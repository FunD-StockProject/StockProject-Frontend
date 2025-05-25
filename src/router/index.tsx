import { Outlet, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import Usage from '@pages/Usage/Usage';
import Mainlayout from '../layout/Mainlayout/Mainlayout';
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import ShortView from '@pages/ShortView/ShortView';

export const webPath = {
  search: () => '/search',
  usage: () => '/usage',
  shortView: () => '/shortview',
};

const Root = () => {
  return (
    <Mainlayout>
      <Outlet />
      <ScrollRestoration />
    </Mainlayout>
  );
};

const routes = [
  { path: '*', element: <div>404 Not Found</div> },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: webPath.search(),
        children: [{ path: '', element: <Search /> }],
      },
    ],
  },
  {
    path: webPath.usage(),
    element: <Usage />,
  },

  {
    path: webPath.shortView(),
    element: <ShortView />
  }
];

export const router = createBrowserRouter(routes);
