import { Outlet, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import MyPage from '@pages/MyPage/MyPage';
import Usage from '@pages/Usage/Usage';
import Mainlayout from '../layout/Mainlayout/Mainlayout';
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';

export const webPath = {
  search: () => '/search',
  usage: () => '/usage',
  mypage: () => '/mypage',
  login: () => '/login',
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
      { path: webPath.mypage(), element: <MyPage /> },
    ],
  },
  {
    path: webPath.usage(),
    element: <Usage />,
  },
];

export const router = createBrowserRouter(routes);
