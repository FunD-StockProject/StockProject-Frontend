// import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
// import { initOpenDays } from '@ts/OpenDays';
import './App.css';
import { router } from './router';

function App() {
  // useEffect(() => {
  //   (async () => await initOpenDays())();
  // }, []);

  return <RouterProvider router={router} />;
}

export default App;
