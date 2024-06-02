import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Dashboard, {loader as dashboardLoader} from './pages/Dashboard';
import Home from './pages/Home';
import '@radix-ui/themes/styles.css';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index  element={<Home />} />
      <Route path='dashboard' loader={dashboardLoader} element={<Dashboard />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  );
}

export default App;
