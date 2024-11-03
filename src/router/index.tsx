import { Outlet, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import Mainlayout from '../layout/Mainlayout';
import Result from '../pages/Result';

export const webPath = {
  search: () => '/search',
};

const Root = () => {
  return (
    <Mainlayout>
      <Suspense fallback={<div className="h-full w-full flex items-center justify-center">로딩중</div>}>
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
      {
        path: '/',
        element: <>"초기 홈 화면입니다"</>,
      },
      {
        path: webPath.search(),
        element: <Result />,
      },

      // { path: '/', element: <Navigate to={webPath.timeDeal()} replace /> },
      // { path: webPath.timeDeal(), element: <TimeDeal /> },
      {
        // path: webPath.brandDeal(),
        // element: <BrandDeal />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
