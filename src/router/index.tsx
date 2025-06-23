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
import Lab from '@pages/Lab/Lab';
import Intro from '@components/Lab/Intro/Intro';
import MarketSelection from '@components/Lab/MarketSelection/MarketSelection';
import StockSelection from '@components/Lab/StockSelection/StockSelection';

export const webPath = {
  search: () => '/search',
  usage: () => '/usage',
  shortView: () => '/shortview',
  mypage: () => '/mypage',
  login: () => '/mypage/login',
  register: () => '/mypage/register',
  registerDetail: () => '/mypage/register/detail',
  registerDone: () => '/mypage/register/done',
  lab: () => '/lab',
  labIntro: () => '/lab/Intro',
  labMarketSelection: () => '/lab/MarketSelection',
  labResult: () => '/lab/Result',
  labStockSearch: () => '/lab/StockSearch',
  labStockSelection: () => '/lab/StockSelection',
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
      { path: '/', element: <Home />, },
      { path: webPath.search(), children: [{ path: '', element: <Search /> }], },
      { path: webPath.mypage(), element: <MyPage /> },
      { path: webPath.login(), element: <Login /> },
      { path: webPath.register(), element: <Register /> },
      { path: webPath.registerDetail(), element: <RegisterDetail /> },
      { path: webPath.registerDone(), element: <RegisterDone /> },
      { path: webPath.shortView(), element: <ShortView /> },
      { path: webPath.lab(), element: <Lab /> },
      { path: webPath.labIntro(), element: <Intro /> },
      { path: webPath.labMarketSelection(), element: <MarketSelection /> },
      { path: webPath.labResult(), element: <Lab /> },
      { path: webPath.labStockSearch(), element: <Lab /> },
      { path: webPath.labStockSelection(), element: <StockSelection /> },

    ],
  },
  {
    path: webPath.usage(),
    element: <Usage />,
  },


];

export const router = createBrowserRouter(routes);
