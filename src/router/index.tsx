import { Outlet, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import Login from '@pages/Login/Login';
import MyPage from '@pages/MyPage/MyPage';
import Register from '@pages/Register/Register';
import RegisterDetail from '@pages/RegisterDetail/RegisterDetail';
import RegisterDone from '@pages/RegisterDone/RegisterDone';
import Usage from '@pages/Usage/Usage';
import Mainlayout from '../layout/Mainlayout/Mainlayout';
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import ShortView from '@pages/ShortView/ShortView';

export const webPath = {
  search: () => '/search',
  usage: () => '/usage',
  shortView: () => '/shortview',
  mypage: () => '/mypage',
  login: () => '/mypage/login',
  register: () => '/mypage/register',
  registerDetail: () => '/mypage/register/detail',
  registerDone: () => '/mypage/register/done',
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
      { path: webPath.login(), element: <Login /> },
      { path: webPath.register(), element: <Register /> },
      { path: webPath.registerDetail(), element: <RegisterDetail /> },
      { path: webPath.registerDone(), element: <RegisterDone /> },
      { path: webPath.shortView(), element: <ShortView /> }
    ],
  },
  {
    path: webPath.usage(),
    element: <Usage />,
  },


];

export const router = createBrowserRouter(routes);
