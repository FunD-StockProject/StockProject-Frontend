import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Mainlayout from '@layout/Mainlayout/Mainlayout';

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

export default Root;
