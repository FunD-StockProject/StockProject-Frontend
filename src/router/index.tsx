import { Suspense, lazy } from 'react';
import { Outlet, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import Mainlayout from '../layout/Mainlayout/Mainlayout';

// Lazy load all pages for code splitting
const Home = lazy(() => import('../pages/Home/Home'));
const Search = lazy(() => import('../pages/Search/Search'));
const AboutPage = lazy(() => import('@pages/About/About'));
const Favorites = lazy(() => import('@pages/Favorites/Favorites'));
const Lab = lazy(() => import('@pages/Lab/Lab'));
const RecordSheet = lazy(() => import('@pages/Lab/RecordSheet/RecordSheet'));
const LabStep = lazy(() => import('@pages/Lab/Step/Step'));
const Login = lazy(() => import('@pages/Login/Login'));
const Done = lazy(() => import('@pages/MyPage/Done/Done'));
const EditProfile = lazy(() => import('@pages/MyPage/Edit/Edit'));
const MyPage = lazy(() => import('@pages/MyPage/MyPage'));
const NotificationPage = lazy(() => import('@pages/Notification/Notification'));
const OAuthCallback = lazy(() => import('@pages/OAuthCallback/OAuthCallback'));
const Register = lazy(() => import('@pages/Register/Register'));
const ShortView = lazy(() => import('@pages/ShortView/ShortView'));
const Term = lazy(() => import('@pages/Term/Term'));
const Usage = lazy(() => import('@pages/Usage/Usage'));
const Withdraw = lazy(() => import('@pages/Withdraw/Withdraw'));
const WithdrawDone = lazy(() => import('@pages/WithdrawDone/WithdrawDone'));

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
  notification: () => '/notification',
  oauthCallback: () => '/login/oauth2/code/:provider',
};

const Root = () => {
  return (
    <Mainlayout>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
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
      { path: webPath.usage(), element: <Usage /> },
      { path: webPath.notification(), element: <NotificationPage /> },
      { path: webPath.oauthCallback(), element: <OAuthCallback /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
