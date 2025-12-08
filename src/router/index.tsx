import { Outlet, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import AboutPage from '@pages/About/About';
import Callback from '@pages/Callback/Callback';
import Favorites from '@pages/Favorites/Favorites';
import Lab from '@pages/Lab/Lab';
import RecordSheet from '@pages/Lab/RecordSheet/RecordSheet';
import LabStep from '@pages/Lab/Step/Step';
import Login from '@pages/Login/Login';
import Done from '@pages/MyPage/Done/Done';
import EditProfile from '@pages/MyPage/Edit/Edit';
import MyPage from '@pages/MyPage/MyPage';
import NotificationPage from '@pages/Notification/Notification';
import Register from '@pages/Register/Register';
import ShortView from '@pages/ShortView/ShortView';
import Term from '@pages/Term/Term';
import Usage from '@pages/Usage/Usage';
import Withdraw from '@pages/Withdraw/Withdraw';
import WithdrawDone from '@pages/WithdrawDone/WithdrawDone';
import Mainlayout from '../layout/Mainlayout/Mainlayout';
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';

export type TermKey = 'agreeTerm' | 'agreePrivacy' | 'agreeMarketing';

export const webPath = {
  home: () => '/',
  search: () => '/search',
  usage: () => '/usage',
  shortView: () => '/shortview',
  mypage: () => '/mypage',
  login: () => '/mypage/login',
  register: () => '/mypage/register',
  registerDone: () => '/mypage/register/done',
  editProfile: () => '/mypage/edit',
  editeProfileDone: () => '/mypage/edit/done',
  withdraw: () => '/mypage/withdraw',
  favorites: () => '/favorites',
  withdrawDone: () => '/mypage/withdraw/done',
  lab: () => '/lab',
  labStep: () => '/lab/step',
  labRecordSheet: () => '/lab/recordsheet',
  term: () => '/term',
  about: () => '/about',
  callback: () => '/login/oauth2/code',
  callbackKakao: () => '/login/oauth2/code/kakao',
  callbackGoogle: () => '/login/oauth2/code/google',
  callbackNaver: () => '/login/oauth2/code/naver',
  callbackApple: () => '/login/oauth2/code/apple',
  notification: () => '/notification',
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
      { path: '/', element: <Home /> },
      { path: webPath.search(), children: [{ path: '', element: <Search /> }] },
      { path: webPath.favorites(), element: <Favorites /> },
      { path: webPath.mypage(), element: <MyPage /> },
      { path: webPath.login(), element: <Login /> },
      { path: webPath.register(), element: <Register /> },
      {
        path: webPath.registerDone(),
        element: (
          <Done
            title="회원가입 완료 🎉"
            description={
              <>
                인간지표에 오신걸 환영합니다. <br />
                민심을 읽고, 타이밍을 실험하세요. <br />
                당신의 직감은 얼마나 정확할까요?
              </>
            }
          />
        ),
      },
      { path: webPath.editProfile(), element: <EditProfile /> },
      {
        path: webPath.editeProfileDone(),
        element: <Done title="수정완료 🎉" description="회원 정보를 수정했어요." />,
      },
      { path: webPath.withdraw(), element: <Withdraw /> },
      { path: webPath.withdrawDone(), element: <WithdrawDone /> },
      { path: webPath.shortView(), element: <ShortView /> },
      { path: webPath.lab(), element: <Lab /> },
      { path: webPath.labStep(), element: <LabStep /> },
      { path: webPath.labRecordSheet(), element: <RecordSheet /> },
      { path: webPath.term(), element: <Term /> },
      { path: webPath.about(), element: <AboutPage /> },
      { path: webPath.callbackKakao(), element: <Callback /> },
      { path: webPath.callbackGoogle(), element: <Callback /> },
      { path: webPath.callbackNaver(), element: <Callback /> },
      { path: webPath.callbackApple(), element: <Callback /> },
      { path: webPath.usage(), element: <Usage /> },
      { path: webPath.notification(), element: <NotificationPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
