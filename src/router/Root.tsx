import { Outlet, ScrollRestoration } from 'react-router-dom';
import Mainlayout from '@layout/Mainlayout/Mainlayout';

const Root = () => {
  return (
    <Mainlayout>
      <ScrollRestoration />
      <Outlet />
    </Mainlayout>
  );
};

export default Root;
