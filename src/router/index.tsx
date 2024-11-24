import { Outlet, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Mainlayout from '../layout/Mainlayout/Mainlayout';
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
export const webPath = {
  search: () => '/search',
};

const Root = () => {
  return (
    <Mainlayout>
      <ErrorBoundary fallback={<div style={{ background: 'black' }}>Error Occured</div>}>
        <Suspense fallback={<div style={{ background: 'black' }}>로딩중</div>}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
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
];

export const router = createBrowserRouter(routes);
