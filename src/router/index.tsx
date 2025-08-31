import { Outlet, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import AboutPage from '@pages/About/About';
import Callback from '@pages/Callback/Callback';
import Favorites from '@pages/Favorites/Favorites';
import Lab from '@pages/Lab/Lab';
import Login from '@pages/Login/Login';
import MyPage from '@pages/MyPage/MyPage';
import Register from '@pages/Register/Register';
import RegisterDone from '@pages/RegisterDone/RegisterDone';
import ShortView from '@pages/ShortView/ShortView';
import Term from '@pages/Term/Term';
import Usage from '@pages/Usage/Usage';
import Withdraw from '@pages/Withdraw/Withdraw';
import WithdrawDone from '@pages/WithdrawDone/WithdrawDone';
import Intro from '@components/Lab/Intro/Intro';
import MarketSelection from '@components/Lab/MarketSelection/MarketSelection';
import Result from '@components/Lab/Result/Result';
import StockPurchase from '@components/Lab/StockPurchase/StockPurchase';
import StockRecordSheet from '@components/Lab/StockRecordSheet/StockRecordSheet';
import StockSelection from '@components/Lab/StockSelection/StockSelection';
import Mainlayout from '../layout/Mainlayout/Mainlayout';
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';

export type TermKey = 'agreeTerm' | 'agreePrivacy' | 'agreeMarketing';

export const webPath = {
  search: () => '/search',
  usage: () => '/usage',
  shortView: () => '/shortview',
  mypage: () => '/mypage',
  login: () => '/mypage/login',
  register: () => '/mypage/register',
  registerDone: () => '/mypage/register/done',
  withdraw: () => '/mypage/withdraw',
  favorites: () => '/favorites',
  withdrawDone: () => '/mypage/withdraw/done',
  lab: () => '/lab',
  labIntro: () => '/lab/intro',
  labMarketSelection: () => '/lab/market/selection',
  labResult: () => '/lab/result',
  labStockSelection: () => '/lab/stock/selection',
  labStockPurchase: () => '/lab/stock/purchase',
  labStockSearch: () => '/lab/stock/search',
  labStockRecordSheet: () => '/lab/stock/recordsheet',
  term: () => '/term',
  about: () => '/about',
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
  { path: '/login/oauth2/code/kakao', element: <Callback /> },
  { path: '/login/oauth2/code/google', element: <Callback /> },
  { path: '/login/oauth2/code/naver', element: <Callback /> },
  { path: '/login/oauth2/code/apple', element: <Callback /> },

  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: webPath.search(), children: [{ path: '', element: <Search /> }] },
      { path: webPath.favorites(), element: <Favorites /> },
      { path: webPath.mypage(), element: <MyPage /> },
      { path: webPath.login(), element: <Login /> },
      { path: webPath.register(), element: <Register /> },
      { path: webPath.registerDone(), element: <RegisterDone /> },
      { path: webPath.withdraw(), element: <Withdraw /> },
      { path: webPath.withdrawDone(), element: <WithdrawDone /> },
      { path: webPath.shortView(), element: <ShortView /> },
      { path: webPath.lab(), element: <Lab /> },
      { path: webPath.labIntro(), element: <Intro /> },
      { path: webPath.labMarketSelection(), element: <MarketSelection /> },
      { path: webPath.labResult(), element: <Result /> },
      { path: webPath.labStockSelection(), element: <StockSelection /> },
      { path: webPath.labStockPurchase(), element: <StockPurchase /> },
      { path: webPath.labStockRecordSheet(), element: <StockRecordSheet /> },
      { path: webPath.term(), element: <Term /> },
      { path: webPath.about(), element: <AboutPage /> },
    ],
  },
  { path: webPath.usage(), element: <Usage /> },
];

export const router = createBrowserRouter(routes);
