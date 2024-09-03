import './App.css';
import Login from './component/Login';
import Signup from './component/Signup';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import UserInfoForm from './component/userInfoForm';
import { THEME_DARK } from './AppConfig/AppConstants';
import { ConfigProvider } from 'antd';


function App() {

  const route = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/userInfoForm', element: <UserInfoForm/> },
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
      <ConfigProvider theme={THEME_DARK}>
      <RouterProvider router={route} />
      </ConfigProvider>
    </div>
  );
}

export default App;
