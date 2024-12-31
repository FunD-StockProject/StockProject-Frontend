import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router';

// App.css 파일을 import

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
