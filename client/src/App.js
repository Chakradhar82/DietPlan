import './App.css';
import Login from './component/Login';
import Signup from './component/Signup';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';


function App() {

  const route = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '', element: <Login /> },
      ]
    }
  ])

  return (
    <div className='background'>
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
