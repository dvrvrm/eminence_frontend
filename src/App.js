import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ProductsPage, { loader as productsLoader } from './pages/Products';
import SignIn, {action as signInAction} from './pages/SignIn';
import { action as logoutAction } from './pages/Logout';
import { tokenLoader, checkAuthLoader} from './util/auth';
import ProductsRootLayout from './pages/ProductsRoot';
import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import SignUp, {action as signUpAction} from './pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
   // errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'signup',
        element: <SignUp />,
        action: signUpAction
      },  {
        path: 'signin',
        element: <SignIn />,
        action: signInAction
      },
      {
        path: 'logout',
        action: logoutAction
      },
      {
        path: 'products',
        element: <ProductsRootLayout />,
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            element: <ProductsPage />,
            loader: productsLoader,
          }
        ],
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
